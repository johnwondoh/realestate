// ============================================================================
// lib/db/queries/properties.ts
// Property query builder with type-safe filters
// ============================================================================

import { db } from '@/lib/db';
import { properties, agents, agencies } from '@/lib/db/schema';
import { eq, and, or, gte, lte, inArray, sql, desc, asc } from 'drizzle-orm';
import type { SQL } from 'drizzle-orm';

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
    // Location filters (can be arrays for multiple values)
    country?: string | string[];
    city?: string | string[];
    state?: string | string[];
    suburb?: string | string[];
    district?: string | string[];

    // Property characteristics
    isAuction?: boolean;
    bedrooms?: number; // 4+ would be passed as 4, handled in frontend
    bathrooms?: number;
    status?: PropertyStatus | PropertyStatus[];

    // Date filters
    listedDateFrom?: Date | string;
    listedDateTo?: Date | string;
    listedDateBefore?: Date | string;
    listedDateAfter?: Date | string;

    // Price range
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
// Query Builder
// ============================================================================

class PropertyQueryBuilder {
    private whereConditions: SQL[] = [];

    /**
     * Builds WHERE clause from filters
     */
    buildWhereClause(filters?: PropertyFilters | null): SQL | undefined {
        // Handle null, undefined, or empty filters
        if (!filters || Object.keys(filters).length === 0) {
            return undefined;
        }

        this.whereConditions = [];

        // Location filters (support single string or array)
        this.addLocationFilter('country', filters.country);
        this.addLocationFilter('city', filters.city);
        this.addLocationFilter('state', filters.state);
        this.addLocationFilter('suburb', filters.suburb);
        this.addLocationFilter('district', filters.district);

        // Boolean filters
        if (filters.isAuction !== undefined && filters.isAuction !== null) {
            this.whereConditions.push(eq(properties.isAuction, filters.isAuction));
        }

        // Numeric filters
        if (filters.bedrooms !== undefined && filters.bedrooms !== null) {
            this.whereConditions.push(
                filters.bedrooms >= 4
                    ? gte(properties.bedrooms, 4) // Handle 4+ bedrooms
                    : eq(properties.bedrooms, filters.bedrooms)
            );
        }

        if (filters.bathrooms !== undefined && filters.bathrooms !== null) {
            this.whereConditions.push(
                filters.bathrooms >= 4
                    ? gte(properties.bathrooms, sql`4`) // Handle 4+ bathrooms
                    : eq(properties.bathrooms, sql`${filters.bathrooms}`)
            );
        }

        // Status filter (single or multiple)
        if (filters.status) {
            if (Array.isArray(filters.status)) {
                if (filters.status.length > 0) {
                    this.whereConditions.push(inArray(properties.status, filters.status));
                }
            } else {
                this.whereConditions.push(eq(properties.status, filters.status));
            }
        }

        // Date range filters
        this.addDateFilters(filters);

        // Price range
        if (filters.minPrice !== undefined && filters.minPrice !== null) {
            this.whereConditions.push(
                gte(properties.minPrice, sql`${filters.minPrice}`)
            );
        }
        if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
            this.whereConditions.push(
                lte(properties.maxPrice, sql`${filters.maxPrice}`)
            );
        }

        // ID filters (support single or array)
        this.addIdFilter('agencyId', filters.agencyId);
        this.addIdFilter('agentId', filters.agentId);
        this.addIdFilter('id', filters.id);

        return this.whereConditions.length > 0
            ? and(...this.whereConditions)
            : undefined;
    }

    /**
     * Helper: Add location filter (supports string or array)
     */
    private addLocationFilter(
        column: 'country' | 'city' | 'state' | 'suburb' | 'district',
        value?: string | string[] | null
    ) {
        if (!value) return;

        if (Array.isArray(value)) {
            // Only add if array has items
            if (value.length > 0) {
                this.whereConditions.push(inArray(properties[column], value));
            }
        } else {
            this.whereConditions.push(eq(properties[column], value));
        }
    }

    /**
     * Helper: Add ID filter (supports number or array)
     */
    private addIdFilter(
        column: 'agencyId' | 'agentId' | 'id',
        value?: number | number[] | null
    ) {
        if (!value) return;

        if (Array.isArray(value)) {
            // Only add if array has items
            if (value.length > 0) {
                this.whereConditions.push(inArray(properties[column], value));
            }
        } else {
            this.whereConditions.push(eq(properties[column], value));
        }
    }

    /**
     * Helper: Add date filters
     */
    private addDateFilters(filters: PropertyFilters) {
        // Range: from-to
        if (filters.listedDateFrom) {
            this.whereConditions.push(
                gte(properties.listedDate, new Date(filters.listedDateFrom))
            );
        }
        if (filters.listedDateTo) {
            this.whereConditions.push(
                lte(properties.listedDate, new Date(filters.listedDateTo))
            );
        }

        // Absolute: before/after
        if (filters.listedDateBefore) {
            this.whereConditions.push(
                lte(properties.listedDate, new Date(filters.listedDateBefore))
            );
        }
        if (filters.listedDateAfter) {
            this.whereConditions.push(
                gte(properties.listedDate, new Date(filters.listedDateAfter))
            );
        }
    }

    /**
     * Builds ORDER BY clause
     */
    buildOrderByClause(sortBy: PropertySortBy = 'featured') {
        switch (sortBy) {
            case 'price-low':
                return asc(properties.minPrice);
            case 'price-high':
                return desc(properties.minPrice);
            case 'newest':
                return desc(properties.listedDate);
            case 'oldest':
                return asc(properties.listedDate);
            default: // 'featured'
                return desc(properties.listedDate);
        }
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
        filters = {},
    } = options;

    const offset = (page - 1) * limit;
    const builder = new PropertyQueryBuilder();

    // Build WHERE and ORDER BY clauses
    const whereClause = builder.buildWhereClause(filters);
    const orderByClause = builder.buildOrderByClause(sortBy);

    // Execute query with joins
    const propertiesData = await db
        .select({
            property: properties,
            agent: agents,
            agency: agencies,
        })
        .from(properties)
        .leftJoin(agents, eq(properties.agentId, agents.id))
        .leftJoin(agencies, eq(properties.agencyId, agencies.id))
        .where(whereClause)
        .orderBy(orderByClause)
        .limit(limit)
        .offset(offset);

    // Get total count with same filters
    const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(properties)
        .where(whereClause);

    return {
        properties: propertiesData,
        totalCount: Number(count),
        totalPages: Math.ceil(Number(count) / limit),
        currentPage: page,
    };
}

// ============================================================================
// Specialized Query Functions (Optional convenience methods)
// ============================================================================

/**
 * Get properties for sale in a specific suburb
 */
export async function getPropertiesForSale(
    suburb: string,
    options: Omit<PropertyQueryOptions, 'filters'> = {}
) {
    return queryProperties({
        ...options,
        filters: {
            suburb,
            status: 'buy',
        },
    });
}

/**
 * Get properties by agent
 */
export async function getPropertiesByAgent(
    agentId: number,
    options: Omit<PropertyQueryOptions, 'filters'> = {}
) {
    return queryProperties({
        ...options,
        filters: {
            agentId,
        },
    });
}

/**
 * Get auction properties
 */
export async function getAuctionProperties(
    options: Omit<PropertyQueryOptions, 'filters'> = {}
) {
    return queryProperties({
        ...options,
        filters: {
            isAuction: true,
            status: 'buy',
        },
    });
}




// ============================================================================
// Example Usage in Page Component
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

  // Type guard ensures TypeScript knows data exists
  if (!result.success) {
    return <div>Error: {result.error}</div>;
  }

  // Now TypeScript knows result.data exists and has the correct type
  const { properties, totalCount, currentPage, totalPages } = result.data;

  return (
    <div>
      <h1>{totalCount} properties found</h1>
      <p>Page {currentPage} of {totalPages}</p>
      {properties.map(({ property, agent, agency }) => (
        <PropertyCard
          key={property.id}
          property={property}
          agent={agent}
          agency={agency}
        />
      ))}
    </div>
  );
}

// Example URLs:
// /properties?suburb=Adelaide&bedrooms=3&minPrice=500000
// /properties?state=SA,VIC,NSW&status=buy,rent&sortBy=price-low
// /properties?agentId=5&isAuction=true&page=2
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
//     buildWhereClause(filters?: PropertyFilters): SQL | undefined {
//         if (!filters) return undefined;
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
//         if (filters.isAuction !== undefined) {
//             this.whereConditions.push(eq(properties.isAuction, filters.isAuction));
//         }
//
//         // Numeric filters
//         if (filters.bedrooms !== undefined) {
//             this.whereConditions.push(
//                 filters.bedrooms >= 4
//                     ? gte(properties.bedrooms, 4) // Handle 4+ bedrooms
//                     : eq(properties.bedrooms, filters.bedrooms)
//             );
//         }
//
//         if (filters.bathrooms !== undefined) {
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
//                 this.whereConditions.push(inArray(properties.status, filters.status));
//             } else {
//                 this.whereConditions.push(eq(properties.status, filters.status));
//             }
//         }
//
//         // Date range filters
//         this.addDateFilters(filters);
//
//         // Price range
//         if (filters.minPrice !== undefined) {
//             this.whereConditions.push(
//                 gte(properties.minPrice, sql`${filters.minPrice}`)
//             );
//         }
//         if (filters.maxPrice !== undefined) {
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
//         column: keyof typeof properties.$inferSelect,
//         value?: string | string[]
//     ) {
//         if (!value) return;
//
//         if (Array.isArray(value)) {
//             this.whereConditions.push(inArray(properties[column], value));
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
//         value?: number | number[]
//     ) {
//         if (!value) return;
//
//         if (Array.isArray(value)) {
//             this.whereConditions.push(inArray(properties[column], value));
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
//
// // ============================================================================
// // Specialized Query Functions (Optional convenience methods)
// // ============================================================================
//
// /**
//  * Get properties for sale in a specific suburb
//  */
// export async function getPropertiesForSale(
//     suburb: string,
//     options: Omit<PropertyQueryOptions, 'filters'> = {}
// ) {
//     return queryProperties({
//         ...options,
//         filters: {
//             suburb,
//             status: 'buy',
//         },
//     });
// }
//
// /**
//  * Get properties by agent
//  */
// export async function getPropertiesByAgent(
//     agentId: number,
//     options: Omit<PropertyQueryOptions, 'filters'> = {}
// ) {
//     return queryProperties({
//         ...options,
//         filters: {
//             agentId,
//         },
//     });
// }
//
// /**
//  * Get auction properties
//  */
// export async function getAuctionProperties(
//     options: Omit<PropertyQueryOptions, 'filters'> = {}
// ) {
//     return queryProperties({
//         ...options,
//         filters: {
//             isAuction: true,
//             status: 'buy',
//         },
//     });
// }
//
//
//
// // ============================================================================
// // Example Usage in Page Component
// // ============================================================================
//
// /*
// // app/properties/page.tsx
// import { getPropertiesAction } from '@/actions/properties';
// import type { PropertySearchParams } from '@/lib/utils/property-filters';
//
// export default async function PropertiesPage({
//   searchParams,
// }: {
//   searchParams: PropertySearchParams;
// }) {
//   const result = await getPropertiesAction(searchParams);
//
//   // Type guard ensures TypeScript knows data exists
//   if (!result.success) {
//     return <div>Error: {result.error}</div>;
//   }
//
//   // Now TypeScript knows result.data exists and has the correct type
//   const { properties, totalCount, currentPage, totalPages } = result.data;
//
//   return (
//     <div>
//       <h1>{totalCount} properties found</h1>
//       <p>Page {currentPage} of {totalPages}</p>
//       {properties.map(({ property, agent, agency }) => (
//         <PropertyCard
//           key={property.id}
//           property={property}
//           agent={agent}
//           agency={agency}
//         />
//       ))}
//     </div>
//   );
// }
//
// // Example URLs:
// // /properties?suburb=Adelaide&bedrooms=3&minPrice=500000
// // /properties?state=SA,VIC,NSW&status=buy,rent&sortBy=price-low
// // /properties?agentId=5&isAuction=true&page=2
// */