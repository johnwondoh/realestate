// ============================================================================
// actions/properties.ts
// Server Actions
// ============================================================================

'use server';

import { queryProperties, type PropertyQueryResult } from '@/lib/db/queries/properties';
// import { parsePropertyFilters, parseSortBy, type PropertySearchParams } from '@/lib/utils/property-filters';
import {parsePropertyFilters, parseSortBy, type PropertySearchParams} from "@/lib/utils/property-filters";

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
