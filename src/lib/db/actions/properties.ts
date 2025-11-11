// ============================================================================
// actions/properties.ts
// Server Actions using the query builder
// ============================================================================

'use server';

import { queryProperties, type PropertyQueryResult } from '@/lib/db/queries/properties';
// import { parsePropertyFilters, parseSortBy, type PropertySearchParams } from '@/lib/utils/property-filters';
import {parsePropertyFilters, parseSortBy, type PropertySearchParams} from "@/lib/db/utils/property-filters";

// Action return types
type SuccessResult = {
    success: true;
    data: PropertyQueryResult;
};

type ErrorResult = {
    success: false;
    error: string;
    data?: never; // Ensures data doesn't exist when success is false
};

export type PropertyActionResult = SuccessResult | ErrorResult;

/**
 * Server Action: Get properties with filters from search params
 */
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
        console.error('Error fetching properties:', error);
        return {
            success: false,
            error: 'Failed to fetch properties',
        };
    }
}