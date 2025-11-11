// ============================================================================
// lib/db/queries/properties.ts
// Simplified property queries with Drizzle ORM
// ============================================================================

import { db } from '@/lib/db';
import { properties, agents, agencies } from '@/lib/db/schema';
import { eq, and, gte, lte, inArray, sql, desc, asc, type SQL } from 'drizzle-orm';

// ============================================================================
// Types
// ============================================================================

export type PropertySortBy =
    | 'featured'
    | 'price-low'
    | 'price-high'
    | 'newest'
    | 'oldest';

export type PropertyStatus = 'buy' | 'rent' | 'sold';

export interface PropertyFilters {
    // Location
    country?: string | string[];
    city?: string | string[];
    state?: string | string[];
    suburb?: string | string[];
    district?: string | string[];

    // Property characteristics
    isAuction?: boolean;
    bedrooms?: number;
    bathrooms?: number;
    status?: PropertyStatus | PropertyStatus[];

    // Dates
    listedDateFrom?: Date | string;
    listedDateTo?: Date | string;

    // Price
    minPrice?: number;
    maxPrice?: number;

    // IDs
    agencyId?: number | number[];
    agentId?: number | number[];
    id?: number | number[];
}

export interface PropertyQueryOptions {
    page?: number;
    limit?: number;
    sortBy?: PropertySortBy;
    filters?: PropertyFilters;
}

export interface PropertyQueryResult {
    properties: Array<{
        property: typeof properties.$inferSelect;
        agent: typeof agents.$inferSelect | null;
        agency: typeof agencies.$inferSelect | null;
    }>;
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Build WHERE conditions from filters
 * Returns array of SQL conditions to be combined with AND
 */
function buildWhereConditions(filters?: PropertyFilters): SQL[] {
    if (!filters) return [];

    const conditions: SQL[] = [];

    // Helper: add string/array filter
    const addFilter = (column: typeof properties.country | typeof properties.city | typeof properties.state | typeof properties.suburb | typeof properties.district, value?: string | string[]) => {
        if (!value) return;
        if (Array.isArray(value) && value.length > 0) {
            conditions.push(inArray(column, value));
        } else if (typeof value === 'string') {
            conditions.push(eq(column, value));
        }
    };

    // Helper: add number/array filter
    const addIdFilter = (column: typeof properties.agencyId | typeof properties.agentId | typeof properties.id, value?: number | number[]) => {
        if (!value) return;
        if (Array.isArray(value) && value.length > 0) {
            conditions.push(inArray(column, value));
        } else if (typeof value === 'number') {
            conditions.push(eq(column, value));
        }
    };

    // Location filters
    addFilter(properties.country, filters.country);
    addFilter(properties.city, filters.city);
    addFilter(properties.state, filters.state);
    addFilter(properties.suburb, filters.suburb);
    addFilter(properties.district, filters.district);

    // Boolean
    if (filters.isAuction !== undefined) {
        conditions.push(eq(properties.isAuction, filters.isAuction));
    }

    // Bedrooms (handle 4+)
    if (filters.bedrooms !== undefined) {
        conditions.push(
            filters.bedrooms >= 4
                ? gte(properties.bedrooms, 4)
                : eq(properties.bedrooms, filters.bedrooms)
        );
    }

    // Bathrooms (handle 4+)
    if (filters.bathrooms !== undefined) {
        conditions.push(
            filters.bathrooms >= 4
                ? gte(properties.bathrooms, sql`4`)
                : eq(properties.bathrooms, sql`${filters.bathrooms}`)
        );
    }

    // Status
    if (filters.status) {
        if (Array.isArray(filters.status) && filters.status.length > 0) {
            conditions.push(inArray(properties.status, filters.status));
        } else if (typeof filters.status === 'string') {
            conditions.push(eq(properties.status, filters.status));
        }
    }

    // Date range
    if (filters.listedDateFrom) {
        conditions.push(gte(properties.listedDate, new Date(filters.listedDateFrom)));
    }
    if (filters.listedDateTo) {
        conditions.push(lte(properties.listedDate, new Date(filters.listedDateTo)));
    }

    // Price range
    if (filters.minPrice !== undefined) {
        conditions.push(gte(properties.minPrice, sql`${filters.minPrice}`));
    }
    if (filters.maxPrice !== undefined) {
        conditions.push(lte(properties.maxPrice, sql`${filters.maxPrice}`));
    }

    // IDs
    addIdFilter(properties.agencyId, filters.agencyId);
    addIdFilter(properties.agentId, filters.agentId);
    addIdFilter(properties.id, filters.id);

    return conditions;
}

/**
 * Get sort column based on sortBy parameter
 */
function getSortColumn(sortBy: PropertySortBy = 'featured') {
    switch (sortBy) {
        case 'price-low':
            return asc(properties.minPrice);
        case 'price-high':
            return desc(properties.minPrice);
        case 'newest':
            return desc(properties.listedDate);
        case 'oldest':
            return asc(properties.listedDate);
        default:
            return desc(properties.listedDate);
    }
}

// ============================================================================
// Main Query Function
// ============================================================================

export async function queryProperties(
    options: PropertyQueryOptions = {}
): Promise<PropertyQueryResult> {
    const {
        page = 1,
        limit = 10,
        sortBy = 'featured',
        filters,
    } = options;

    const offset = (page - 1) * limit;

    // Build WHERE clause
    const conditions = buildWhereConditions(filters);
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Execute query
    const [propertiesData, countResult] = await Promise.all([
        db
            .select({
                property: properties,
                agent: agents,
                agency: agencies,
            })
            .from(properties)
            .leftJoin(agents, eq(properties.agentId, agents.id))
            .leftJoin(agencies, eq(properties.agencyId, agencies.id))
            .where(whereClause)
            .orderBy(getSortColumn(sortBy))
            .limit(limit)
            .offset(offset),

        db
            .select({ count: sql<number>`count(*)` })
            .from(properties)
            .where(whereClause)
    ]);

    const totalCount = Number(countResult[0].count);

    return {
        properties: propertiesData,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
    };
}



// ============================================================================
// Usage Example
// ============================================================================

/*
// app/properties/page.tsx
import { getPropertiesAction } from '@/actions/properties';
import type { PropertySearchParams } from '@/lib/utils/property-filters';

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: PropertySearchParams;
}) {
  const result = await getPropertiesAction(searchParams);

  if (!result.success) {
    return <div>Error: {result.error}</div>;
  }

  const { properties, totalCount, currentPage, totalPages } = result.data;

  return (
    <div>
      <h1>{totalCount} properties found</h1>
      {properties.map(({ property, agent, agency }) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  );
}
*/


// // ============================================================================
// // lib/db/queries/properties.ts
// // Property query builder with type-safe filters
// // ============================================================================
//
// import { db } from '@/lib/db';
// import { properties, agents, agencies } from '@/lib/db/schema';
// import { eq, and, or, gte, lte, inArray, sql, desc, asc } from 'drizzle-orm';
// import type { SQL } from 'drizzle-orm';
//
// // ============================================================================
// // Types
// // ============================================================================
//
// export type PropertySortBy =
//     | 'featured'
//     | 'price-low'
//     | 'price-high'
//     | 'newest'
//     | 'oldest';
//
// export type PropertyStatus = 'buy' | 'rent' | 'sold';
//
// export interface PropertyFilters {
//     // Location filters (can be arrays for multiple values)
//     country?: string | string[];
//     city?: string | string[];
//     state?: string | string[];
//     suburb?: string | string[];
//     district?: string | string[];
//
//     // Property characteristics
//     isAuction?: boolean;
//     bedrooms?: number; // 4+ would be passed as 4, handled in frontend
//     bathrooms?: number;
//     status?: PropertyStatus | PropertyStatus[];
//
//     // Date filters
//     listedDateFrom?: Date | string;
//     listedDateTo?: Date | string;
//     listedDateBefore?: Date | string;
//     listedDateAfter?: Date | string;
//
//     // Price range
//     minPrice?: number;
//     maxPrice?: number;
//
//     // IDs
//     agencyId?: number | number[];
//     agentId?: number | number[];
//     id?: number | number[];
// }
//
// export interface PropertyQueryOptions {
//     page?: number;
//     limit?: number;
//     sortBy?: PropertySortBy;
//     filters?: PropertyFilters;
// }
//
// export interface PropertyQueryResult {
//     properties: Array<{
//         property: typeof properties.$inferSelect;
//         agent: typeof agents.$inferSelect | null;
//         agency: typeof agencies.$inferSelect | null;
//     }>;
//     totalCount: number;
//     totalPages: number;
//     currentPage: number;
// }
//
// // ============================================================================
// // Query Builder
// // ============================================================================
//
// class PropertyQueryBuilder {
//     private whereConditions: SQL[] = [];
//
//     /**
//      * Builds WHERE clause from filters
//      */
//     buildWhereClause(filters?: PropertyFilters | null): SQL | undefined {
//         // Handle null, undefined, or empty filters
//         if (!filters || Object.keys(filters).length === 0) {
//             return undefined;
//         }
//
//         this.whereConditions = [];
//
//         // Location filters (support single string or array)
//         this.addLocationFilter('country', filters.country);
//         this.addLocationFilter('city', filters.city);
//         this.addLocationFilter('state', filters.state);
//         this.addLocationFilter('suburb', filters.suburb);
//         this.addLocationFilter('district', filters.district);
//
//         // Boolean filters
//         if (filters.isAuction !== undefined && filters.isAuction !== null) {
//             this.whereConditions.push(eq(properties.isAuction, filters.isAuction));
//         }
//
//         // Numeric filters
//         if (filters.bedrooms !== undefined && filters.bedrooms !== null) {
//             this.whereConditions.push(
//                 filters.bedrooms >= 4
//                     ? gte(properties.bedrooms, 4) // Handle 4+ bedrooms
//                     : eq(properties.bedrooms, filters.bedrooms)
//             );
//         }
//
//         if (filters.bathrooms !== undefined && filters.bathrooms !== null) {
//             this.whereConditions.push(
//                 filters.bathrooms >= 4
//                     ? gte(properties.bathrooms, sql`4`) // Handle 4+ bathrooms
//                     : eq(properties.bathrooms, sql`${filters.bathrooms}`)
//             );
//         }
//
//         // Status filter (single or multiple)
//         if (filters.status) {
//             if (Array.isArray(filters.status)) {
//                 if (filters.status.length > 0) {
//                     this.whereConditions.push(inArray(properties.status, filters.status));
//                 }
//             } else {
//                 this.whereConditions.push(eq(properties.status, filters.status));
//             }
//         }
//
//         // Date range filters
//         this.addDateFilters(filters);
//
//         // Price range
//         if (filters.minPrice !== undefined && filters.minPrice !== null) {
//             this.whereConditions.push(
//                 gte(properties.minPrice, sql`${filters.minPrice}`)
//             );
//         }
//         if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
//             this.whereConditions.push(
//                 lte(properties.maxPrice, sql`${filters.maxPrice}`)
//             );
//         }
//
//         // ID filters (support single or array)
//         this.addIdFilter('agencyId', filters.agencyId);
//         this.addIdFilter('agentId', filters.agentId);
//         this.addIdFilter('id', filters.id);
//
//         return this.whereConditions.length > 0
//             ? and(...this.whereConditions)
//             : undefined;
//     }
//
//     /**
//      * Helper: Add location filter (supports string or array)
//      */
//     private addLocationFilter(
//         column: 'country' | 'city' | 'state' | 'suburb' | 'district',
//         value?: string | string[] | null
//     ) {
//         if (!value) return;
//
//         if (Array.isArray(value)) {
//             // Only add if array has items
//             if (value.length > 0) {
//                 this.whereConditions.push(inArray(properties[column], value));
//             }
//         } else {
//             this.whereConditions.push(eq(properties[column], value));
//         }
//     }
//
//     /**
//      * Helper: Add ID filter (supports number or array)
//      */
//     private addIdFilter(
//         column: 'agencyId' | 'agentId' | 'id',
//         value?: number | number[] | null
//     ) {
//         if (!value) return;
//
//         if (Array.isArray(value)) {
//             // Only add if array has items
//             if (value.length > 0) {
//                 this.whereConditions.push(inArray(properties[column], value));
//             }
//         } else {
//             this.whereConditions.push(eq(properties[column], value));
//         }
//     }
//
//     /**
//      * Helper: Add date filters
//      */
//     private addDateFilters(filters: PropertyFilters) {
//         // Range: from-to
//         if (filters.listedDateFrom) {
//             this.whereConditions.push(
//                 gte(properties.listedDate, new Date(filters.listedDateFrom))
//             );
//         }
//         if (filters.listedDateTo) {
//             this.whereConditions.push(
//                 lte(properties.listedDate, new Date(filters.listedDateTo))
//             );
//         }
//
//         // Absolute: before/after
//         if (filters.listedDateBefore) {
//             this.whereConditions.push(
//                 lte(properties.listedDate, new Date(filters.listedDateBefore))
//             );
//         }
//         if (filters.listedDateAfter) {
//             this.whereConditions.push(
//                 gte(properties.listedDate, new Date(filters.listedDateAfter))
//             );
//         }
//     }
//
//     /**
//      * Builds ORDER BY clause
//      */
//     buildOrderByClause(sortBy: PropertySortBy = 'featured') {
//         switch (sortBy) {
//             case 'price-low':
//                 return asc(properties.minPrice);
//             case 'price-high':
//                 return desc(properties.minPrice);
//             case 'newest':
//                 return desc(properties.listedDate);
//             case 'oldest':
//                 return asc(properties.listedDate);
//             default: // 'featured'
//                 return desc(properties.listedDate);
//         }
//     }
// }
//
// // ============================================================================
// // Main Query Function
// // ============================================================================
//
// export async function queryProperties(
//     options: PropertyQueryOptions = {}
// ): Promise<PropertyQueryResult> {
//     const {
//         page = 1,
//         limit = 10,
//         sortBy = 'featured',
//         filters = {},
//     } = options;
//
//     const offset = (page - 1) * limit;
//     const builder = new PropertyQueryBuilder();
//
//     // Build WHERE and ORDER BY clauses
//     const whereClause = builder.buildWhereClause(filters);
//     const orderByClause = builder.buildOrderByClause(sortBy);
//
//     // Execute query with joins
//     const propertiesData = await db
//         .select({
//             property: properties,
//             agent: agents,
//             agency: agencies,
//         })
//         .from(properties)
//         .leftJoin(agents, eq(properties.agentId, agents.id))
//         .leftJoin(agencies, eq(properties.agencyId, agencies.id))
//         .where(whereClause)
//         .orderBy(orderByClause)
//         .limit(limit)
//         .offset(offset);
//
//     // Get total count with same filters
//     const [{ count }] = await db
//         .select({ count: sql<number>`count(*)` })
//         .from(properties)
//         .where(whereClause);
//
//     return {
//         properties: propertiesData,
//         totalCount: Number(count),
//         totalPages: Math.ceil(Number(count) / limit),
//         currentPage: page,
//     };
// }
