// ============================================================================
// lib/utils/property-filters.ts
// Helper to parse and validate search params
// ============================================================================

import type { PropertyFilters, PropertySortBy } from '@/lib/db/queries/properties';

export interface PropertySearchParams {
    page?: string;
    limit?: string;
    sortBy?: string;

    // Location
    country?: string;
    city?: string;
    state?: string;
    suburb?: string;
    district?: string;

    // Property characteristics
    isAuction?: string;
    bedrooms?: string;
    bathrooms?: string;
    status?: string;

    // Dates
    listedDateFrom?: string;
    listedDateTo?: string;
    listedDateBefore?: string;
    listedDateAfter?: string;

    // Price
    minPrice?: string;
    maxPrice?: string;

    // IDs
    agencyId?: string;
    agentId?: string;
    id?: string;
}

/**
 * Parse search params into typed filter object
 * Handles comma-separated values for arrays
 */
export function parsePropertyFilters(searchParams: PropertySearchParams): PropertyFilters {
    const filters: PropertyFilters = {};

    // Helper to parse comma-separated values
    const parseArray = (value?: string): string[] | undefined => {
        if (!value) return undefined;
        return value.split(',').map(v => v.trim()).filter(Boolean);
    };

    // Helper to parse number array
    const parseNumberArray = (value?: string): number[] | undefined => {
        if (!value) return undefined;
        return value.split(',').map(v => parseInt(v.trim())).filter(n => !isNaN(n));
    };

    // Location filters (support comma-separated for arrays)
    const country = parseArray(searchParams.country);
    if (country) filters.country = country.length === 1 ? country[0] : country;

    const city = parseArray(searchParams.city);
    if (city) filters.city = city.length === 1 ? city[0] : city;

    const state = parseArray(searchParams.state);
    if (state) filters.state = state.length === 1 ? state[0] : state;

    const suburb = parseArray(searchParams.suburb);
    if (suburb) filters.suburb = suburb.length === 1 ? suburb[0] : suburb;

    const district = parseArray(searchParams.district);
    if (district) filters.district = district.length === 1 ? district[0] : district;

    // Boolean
    if (searchParams.isAuction !== undefined) {
        filters.isAuction = searchParams.isAuction === 'true';
    }

    // Numbers
    if (searchParams.bedrooms) {
        const bedrooms = parseInt(searchParams.bedrooms);
        if (!isNaN(bedrooms)) filters.bedrooms = bedrooms;
    }

    if (searchParams.bathrooms) {
        const bathrooms = parseInt(searchParams.bathrooms);
        if (!isNaN(bathrooms)) filters.bathrooms = bathrooms;
    }

    // Status (can be comma-separated: "buy,rent")
    if (searchParams.status) {
        const statuses = parseArray(searchParams.status) as ('buy' | 'rent' | 'sold')[] | undefined;
        if (statuses) {
            filters.status = statuses.length === 1 ? statuses[0] : statuses;
        }
    }

    // Dates
    if (searchParams.listedDateFrom) {
        filters.listedDateFrom = searchParams.listedDateFrom;
    }
    if (searchParams.listedDateTo) {
        filters.listedDateTo = searchParams.listedDateTo;
    }
    if (searchParams.listedDateBefore) {
        filters.listedDateBefore = searchParams.listedDateBefore;
    }
    if (searchParams.listedDateAfter) {
        filters.listedDateAfter = searchParams.listedDateAfter;
    }

    // Price
    if (searchParams.minPrice) {
        const minPrice = parseFloat(searchParams.minPrice);
        if (!isNaN(minPrice)) filters.minPrice = minPrice;
    }
    if (searchParams.maxPrice) {
        const maxPrice = parseFloat(searchParams.maxPrice);
        if (!isNaN(maxPrice)) filters.maxPrice = maxPrice;
    }

    // IDs (support comma-separated)
    const agencyId = parseNumberArray(searchParams.agencyId);
    if (agencyId) filters.agencyId = agencyId.length === 1 ? agencyId[0] : agencyId;

    const agentId = parseNumberArray(searchParams.agentId);
    if (agentId) filters.agentId = agentId.length === 1 ? agentId[0] : agentId;

    const id = parseNumberArray(searchParams.id);
    if (id) filters.id = id.length === 1 ? id[0] : id;

    return filters;
}

/**
 * Validate and parse sortBy param
 */
export function parseSortBy(sortBy?: string): PropertySortBy {
    const validSorts: PropertySortBy[] = ['featured', 'price-low', 'price-high', 'newest', 'oldest'];
    return validSorts.includes(sortBy as PropertySortBy)
        ? (sortBy as PropertySortBy)
        : 'featured';
}

