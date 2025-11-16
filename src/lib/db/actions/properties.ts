// ============================================================================
// actions/properties.ts
// Server Actions
// ============================================================================

'use server';

import { queryProperties, type PropertyQueryResult } from '@/lib/db/queries/properties';
// import { parsePropertyFilters, parseSortBy, type PropertySearchParams } from '@/lib/utils/property-filters';
import {parsePropertyFilters, parseSortBy, type PropertySearchParams} from "@/lib/utils/property-filters";

import {properties, agents, agencies} from "@/lib/db/schema";
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';

type SuccessResult = {
    success: true;
    data: PropertyQueryResult;
};

type ErrorResult = {
    success: false;
    error: string;
};

export type PropertyActionResult = SuccessResult | ErrorResult;

export async function getPropertiesAction(
    searchParams: PropertySearchParams
): Promise<PropertyActionResult> {
    try {
        const filters = parsePropertyFilters(searchParams);
        const page = parseInt(searchParams.page || '1');
        const limit = parseInt(searchParams.limit || '10');
        const sortBy = parseSortBy(searchParams.sortBy);

        const result = await queryProperties({
            page: isNaN(page) ? 1 : page,
            limit: isNaN(limit) ? 10 : limit,
            sortBy,
            filters,
        });

        return { success: true, data: result };
    } catch (error) {
        console.error('Error in getPropertiesAction:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch properties',
        };
    }
}

// ============================================================================
// Single Property Actions
// ============================================================================

export type SinglePropertyResult = {
    property: typeof properties.$inferSelect;
    agent: typeof agents.$inferSelect | null;
    agency: typeof agencies.$inferSelect | null;
};

type SinglePropertySuccess = {
    success: true;
    data: SinglePropertyResult;
};

type SinglePropertyError = {
    success: false;
    error: string;
};

export type SinglePropertyActionResult = SinglePropertySuccess | SinglePropertyError;

/**
 * Get a single property by ID
 * Optimized for single record retrieval
 */
export async function getPropertyByIdAction(
    propertyId: number
): Promise<SinglePropertyActionResult> {
    try {
        const result = await db
            .select({
                property: properties,
                agent: agents,
                agency: agencies,
            })
            .from(properties)
            .leftJoin(agents, eq(properties.agentId, agents.id))
            .leftJoin(agencies, eq(properties.agencyId, agencies.id))
            .where(eq(properties.id, propertyId))
            .limit(1);

        if (result.length === 0) {
            return {
                success: false,
                error: 'Property not found',
            };
        }

        return {
            success: true,
            data: result[0],
        };
    } catch (error) {
        console.error('Error in getPropertyByIdAction:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch property',
        };
    }
}

/**
 * Get property by ID (slug-friendly version)
 * Accepts either numeric ID or string that can be parsed
 */
export async function getPropertyAction(
    id: string | number
): Promise<SinglePropertyActionResult> {
    const propertyId = typeof id === 'string' ? parseInt(id) : id;

    if (isNaN(propertyId)) {
        return {
            success: false,
            error: 'Invalid property ID',
        };
    }

    return getPropertyByIdAction(propertyId);
}




// 'use server';
//
// import { queryProperties, type PropertyQueryResult } from '@/lib/db/queries/properties';
// // import { parsePropertyFilters, parseSortBy, type PropertySearchParams } from '@/lib/utils/property-filters';
// import {parsePropertyFilters, parseSortBy, type PropertySearchParams} from "@/lib/db/utils/property-filters";
//
// // ============================================================================
// // Server Actions using the query builder
// // ============================================================================
//
// // Action return types
// type SuccessResult = {
//     success: true;
//     data: PropertyQueryResult;
// };
//
// type ErrorResult = {
//     success: false;
//     error: string;
//     data?: never; // Ensures data doesn't exist when success is false
// };
//
// export type PropertyActionResult = SuccessResult | ErrorResult;
//
// /**
//  * Server Action: Get properties with filters from search params
//  */
// export async function getPropertiesAction(
//     searchParams: PropertySearchParams
// ): Promise<PropertyActionResult> {
//     try {
//         console.log('=== getPropertiesAction Debug ===');
//         console.log('Raw searchParams:', searchParams);
//
//         const filters = parsePropertyFilters(searchParams);
//         console.log('Parsed filters:', filters);
//
//         const page = parseInt(searchParams.page || '1');
//         const limit = parseInt(searchParams.limit || '10');
//         const sortBy = parseSortBy(searchParams.sortBy);
//
//         console.log('Query options:', { page, limit, sortBy });
//
//         const result = await queryProperties({
//             page: isNaN(page) ? 1 : page,
//             limit: isNaN(limit) ? 10 : limit,
//             sortBy,
//             filters,
//         });
//
//         console.log('Query result:', {
//             propertiesCount: result.properties.length,
//             totalCount: result.totalCount
//         });
//
//         return { success: true, data: result };
//     } catch (error) {
//         console.error('=== Error in getPropertiesAction ===');
//         console.error('Error details:', error);
//         console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
//         return {
//             success: false,
//             error: error instanceof Error ? error.message : 'Failed to fetch properties',
//         };
//     }
// }
//
