'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import SearchBar from './SearchBar';
import ListingTypeFilter from './ListingTypeFilter';
import PriceFilter from './PriceFilter';
import BedsFilter from './BedsFilter';
import PropertyTypesFilter from './PropertyTypesFilter';
import FilterDrawer from './FilterDrawer';

interface SearchFiltersProps {
    visibleFilters?: ('listingType' | 'price' | 'beds' | 'propertyTypes')[];
    showSearchBar?: boolean;
    className?: string;
}

export default function SearchFilters({
    visibleFilters = ['listingType', 'price', 'beds', 'propertyTypes'],
    showSearchBar = true,
    className = ''
}: SearchFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    const [locations, setLocations] = useState<string[]>([]);
    const [listingType, setListingType] = useState<'buy' | 'rent' | 'sold'>('buy');
    const [minPrice, setMinPrice] = useState<number | undefined>();
    const [maxPrice, setMaxPrice] = useState<number | undefined>();
    const [bedrooms, setBedrooms] = useState<number | undefined>();
    const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
    const [bathrooms, setBathrooms] = useState<number | undefined>();

    useEffect(() => {
        const status = searchParams.get('status') as 'buy' | 'rent' | 'sold' | null;
        if (status) setListingType(status);

        const minPriceParam = searchParams.get('minPrice');
        if (minPriceParam) setMinPrice(parseFloat(minPriceParam));

        const maxPriceParam = searchParams.get('maxPrice');
        if (maxPriceParam) setMaxPrice(parseFloat(maxPriceParam));

        const bedroomsParam = searchParams.get('bedrooms');
        if (bedroomsParam) setBedrooms(parseInt(bedroomsParam));

        const bathroomsParam = searchParams.get('bathrooms');
        if (bathroomsParam) setBathrooms(parseInt(bathroomsParam));

        const propertyTypesParam = searchParams.get('propertyType');
        if (propertyTypesParam) {
            setPropertyTypes(propertyTypesParam.split(',').map(t => t.trim()));
        }

        const suburbParam = searchParams.get('suburb');
        if (suburbParam) {
            setLocations(suburbParam.split(',').map(s => s.trim()));
        }
    }, [searchParams]);

    const updateURL = (params: Record<string, string | undefined>) => {
        const current = new URLSearchParams(searchParams);
        
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                current.set(key, value);
            } else {
                current.delete(key);
            }
        });

        current.delete('page');
        router.push(`?${current.toString()}`);
    };

    const handleSearch = (newLocations: string[]) => {
        setLocations(newLocations);
        updateURL({
            suburb: newLocations.length > 0 ? newLocations.join(',') : undefined,
            status: listingType,
            minPrice: minPrice?.toString(),
            maxPrice: maxPrice?.toString(),
            bedrooms: bedrooms?.toString(),
            bathrooms: bathrooms?.toString(),
            propertyType: propertyTypes.length > 0 ? propertyTypes.join(',') : undefined,
        });
    };

    const handleListingTypeChange = (value: 'buy' | 'rent' | 'sold') => {
        setListingType(value);
        updateURL({
            status: value,
            suburb: locations.length > 0 ? locations.join(',') : undefined,
            minPrice: minPrice?.toString(),
            maxPrice: maxPrice?.toString(),
            bedrooms: bedrooms?.toString(),
            bathrooms: bathrooms?.toString(),
            propertyType: propertyTypes.length > 0 ? propertyTypes.join(',') : undefined,
        });
    };

    const handlePriceChange = (min?: number, max?: number) => {
        setMinPrice(min);
        setMaxPrice(max);
        updateURL({
            status: listingType,
            suburb: locations.length > 0 ? locations.join(',') : undefined,
            minPrice: min?.toString(),
            maxPrice: max?.toString(),
            bedrooms: bedrooms?.toString(),
            bathrooms: bathrooms?.toString(),
            propertyType: propertyTypes.length > 0 ? propertyTypes.join(',') : undefined,
        });
    };

    const handleBedsChange = (value?: number) => {
        setBedrooms(value);
        updateURL({
            status: listingType,
            suburb: locations.length > 0 ? locations.join(',') : undefined,
            minPrice: minPrice?.toString(),
            maxPrice: maxPrice?.toString(),
            bedrooms: value?.toString(),
            bathrooms: bathrooms?.toString(),
            propertyType: propertyTypes.length > 0 ? propertyTypes.join(',') : undefined,
        });
    };

    const handlePropertyTypesChange = (values: string[]) => {
        setPropertyTypes(values);
        updateURL({
            status: listingType,
            suburb: locations.length > 0 ? locations.join(',') : undefined,
            minPrice: minPrice?.toString(),
            maxPrice: maxPrice?.toString(),
            bedrooms: bedrooms?.toString(),
            bathrooms: bathrooms?.toString(),
            propertyType: values.length > 0 ? values.join(',') : undefined,
        });
    };

    const handleBathroomsChange = (value?: number) => {
        setBathrooms(value);
    };

    const handleApplyFilters = () => {
        updateURL({
            status: listingType,
            suburb: locations.length > 0 ? locations.join(',') : undefined,
            minPrice: minPrice?.toString(),
            maxPrice: maxPrice?.toString(),
            bedrooms: bedrooms?.toString(),
            bathrooms: bathrooms?.toString(),
            propertyType: propertyTypes.length > 0 ? propertyTypes.join(',') : undefined,
        });
        setIsDrawerOpen(false);
    };

    const handleResetFilters = () => {
        setLocations([]);
        setListingType('buy');
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setBedrooms(undefined);
        setBathrooms(undefined);
        setPropertyTypes([]);
        router.push(window.location.pathname);
        setIsDrawerOpen(false);
    };

    const getActiveFilterCount = () => {
        let count = 0;
        if (minPrice || maxPrice) count++;
        if (bedrooms) count++;
        if (bathrooms) count++;
        if (propertyTypes.length > 0) count++;
        if (locations.length > 0) count++;
        return count;
    };

    return (
        <div className={className}>
            {showSearchBar && (
                <SearchBar
                    initialLocations={locations}
                    onSearch={handleSearch}
                />
            )}

            <div className="flex items-center py-3 gap-2 flex-wrap">
                <button
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors relative"
                >
                    <SlidersHorizontal className="w-5 h-5 text-gray-700" />
                    <span className="font-medium text-sm text-gray-800">Filters</span>
                    {getActiveFilterCount() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {getActiveFilterCount()}
                        </span>
                    )}
                </button>

                {visibleFilters.includes('listingType') && (
                    <ListingTypeFilter
                        value={listingType}
                        onChange={handleListingTypeChange}
                    />
                )}

                {visibleFilters.includes('price') && (
                    <PriceFilter
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        onChange={handlePriceChange}
                    />
                )}

                {visibleFilters.includes('beds') && (
                    <BedsFilter
                        value={bedrooms}
                        onChange={handleBedsChange}
                    />
                )}

                {visibleFilters.includes('propertyTypes') && (
                    <PropertyTypesFilter
                        values={propertyTypes}
                        onChange={handlePropertyTypesChange}
                    />
                )}
            </div>

            <FilterDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Listing Type
                        </label>
                        <select
                            value={listingType}
                            onChange={(e) => setListingType(e.target.value as 'buy' | 'rent' | 'sold')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="buy">Buy</option>
                            <option value="rent">Rent</option>
                            <option value="sold">Sold</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bedrooms
                        </label>
                        <select
                            value={bedrooms || ''}
                            onChange={(e) => setBedrooms(e.target.value ? parseInt(e.target.value) : undefined)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Any</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4+</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bathrooms
                        </label>
                        <select
                            value={bathrooms || ''}
                            onChange={(e) => setBathrooms(e.target.value ? parseInt(e.target.value) : undefined)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Any</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4+</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Min Price
                        </label>
                        <input
                            type="number"
                            value={minPrice || ''}
                            onChange={(e) => setMinPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
                            placeholder="No min"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Max Price
                        </label>
                        <input
                            type="number"
                            value={maxPrice || ''}
                            onChange={(e) => setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
                            placeholder="No max"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="md:col-span-2 lg:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Property Types
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {['House', 'Apartment', 'Condo', 'Townhouse', 'Villa', 'Land', 'Retirement', 'Block Of Units'].map((type) => (
                                <label
                                    key={type}
                                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                                >
                                    <input
                                        type="checkbox"
                                        checked={propertyTypes.includes(type)}
                                        onChange={() => {
                                            const newTypes = propertyTypes.includes(type)
                                                ? propertyTypes.filter(t => t !== type)
                                                : [...propertyTypes, type];
                                            setPropertyTypes(newTypes);
                                        }}
                                        className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                                    />
                                    <span className="text-sm text-gray-700">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </FilterDrawer>
        </div>
    );
}
