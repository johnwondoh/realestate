'use client'

import React, { useState, useMemo } from 'react';
import { ChevronDown, SlidersHorizontal, Bed, Bath, Car, Star } from 'lucide-react';

import PriceRangeFilter from "@/components/Common/PriceRangeFilter";
import BedroomFilter from "@/components/Common/BedroomFilter";
import CheckboxFilter from "@/components/Common/CheckboxFilter";
import FilterToggleButton from "@/components/Common/FilterToggleButton";
import MiniPropertyCard from "@/components/Common/MiniPropertyCard";
import {PropertyCardProps} from "@/components/Common/MiniPropertyCard";
import SortDropdown from "./SortDropdown";

// MiniPropertyCard Component

// PriceRangeFilter Component

// BedroomFilter Component

// CheckboxFilter Component

// SortDropdown Component

// FilterToggleButton Component


// Sample property data
// const sampleProperties: PropertyCardProps[] = [
//     {
//         image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
//         price: '$850,000',
//         address: '123 Ocean View Drive',
//         suburb: 'Brighton',
//         state: 'VIC',
//         postcode: '3186',
//         propertyType: 'House',
//         bedrooms: 4,
//         bathrooms: 2,
//         parking: 2,
//         createdOn: '2024-11-01',
//         agencyColor: '#3b82f6',
//         isFavorite: false
//     },
//     {
//         image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
//         price: '$650,000',
//         address: '45 Park Street',
//         suburb: 'St Kilda',
//         state: 'VIC',
//         postcode: '3182',
//         propertyType: 'Apartment',
//         bedrooms: 2,
//         bathrooms: 2,
//         parking: 1,
//         createdOn: '2024-10-28',
//         agencyColor: '#10b981',
//         isFavorite: false
//     },
//     {
//         image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
//         price: '$1,200,000',
//         address: '78 Riverside Avenue',
//         suburb: 'South Yarra',
//         state: 'VIC',
//         postcode: '3141',
//         propertyType: 'Townhouse',
//         bedrooms: 3,
//         bathrooms: 2,
//         parking: 2,
//         createdOn: '2024-11-03',
//         agencyColor: '#f59e0b',
//         isFavorite: false
//     },
//     {
//         image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400',
//         price: '$495,000',
//         address: '12 Collins Street',
//         suburb: 'Melbourne',
//         state: 'VIC',
//         postcode: '3000',
//         propertyType: 'Apartment',
//         bedrooms: 1,
//         bathrooms: 1,
//         parking: 1,
//         createdOn: '2024-10-15',
//         agencyColor: '#ef4444',
//         isFavorite: false
//     },
//     {
//         image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400',
//         price: '$975,000',
//         address: '56 Garden Lane',
//         suburb: 'Brighton',
//         state: 'VIC',
//         postcode: '3186',
//         propertyType: 'House',
//         bedrooms: 3,
//         bathrooms: 2,
//         parking: 2,
//         createdOn: '2024-10-20',
//         agencyColor: '#8b5cf6',
//         isFavorite: false
//     },
//     {
//         image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400',
//         price: '$720,000',
//         address: '89 Beach Road',
//         suburb: 'St Kilda',
//         state: 'VIC',
//         postcode: '3182',
//         propertyType: 'Apartment',
//         bedrooms: 2,
//         bathrooms: 1,
//         parking: 1,
//         createdOn: '2024-11-02',
//         agencyColor: '#06b6d4',
//         isFavorite: false
//     }
// ];
interface Props {
    agentProperties: PropertyCardProps[];
}
export default function PropertySubView({agentProperties}: Props) {
    const [properties, setProperties] = useState(agentProperties);
    const [sortBy, setSortBy] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);
    const [displayCount, setDisplayCount] = useState(6);

    // Filter states
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
    const [bedroomRange, setBedroomRange] = useState<[number, number]>([0, 10]);
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
    const [selectedSuburbs, setSelectedSuburbs] = useState<string[]>([]);

    // Calculate min/max values from data
    const dataRanges = useMemo(() => {
        const prices = properties.map(p => parseInt(p.price.replace(/[$,]/g, '')));
        const bedrooms = properties.map(p => p.bedrooms || 0);
        const propertyTypes = [...new Set(properties.map(p => p.propertyType).filter(Boolean))];
        const suburbs = [...new Set(properties.map(p => p.suburb))];

        return {
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices),
            minBedrooms: Math.min(...bedrooms),
            maxBedrooms: Math.max(...bedrooms),
            propertyTypes,
            suburbs
        };
    }, [properties]);

    // Reset price and bedroom ranges when data changes
    useMemo(() => {
        setPriceRange([dataRanges.minPrice, dataRanges.maxPrice]);
        setBedroomRange([dataRanges.minBedrooms, dataRanges.maxBedrooms]);
    }, [dataRanges]);

    // Filter and sort properties
    const filteredAndSortedProperties = useMemo(() => {
        let filtered = [...properties];

        // Apply filters
        filtered = filtered.filter(p => {
            const priceNum = parseInt(p.price.replace(/[$,]/g, ''));
            const bedroomNum = p.bedrooms || 0;

            const priceMatch = priceNum >= priceRange[0] && priceNum <= priceRange[1];
            const bedroomMatch = bedroomNum >= bedroomRange[0] && bedroomNum <= bedroomRange[1];
            const typeMatch = selectedPropertyTypes.length === 0 || selectedPropertyTypes.includes(p.propertyType || '');
            const suburbMatch = selectedSuburbs.length === 0 || selectedSuburbs.includes(p.suburb);

            return priceMatch && bedroomMatch && typeMatch && suburbMatch;
        });

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdOn || '').getTime() - new Date(a.createdOn || '').getTime();
                case 'oldest':
                    return new Date(a.createdOn || '').getTime() - new Date(b.createdOn || '').getTime();
                case 'price-low':
                    return parseInt(a.price.replace(/[$,]/g, '')) - parseInt(b.price.replace(/[$,]/g, ''));
                case 'price-high':
                    return parseInt(b.price.replace(/[$,]/g, '')) - parseInt(a.price.replace(/[$,]/g, ''));
                default:
                    return 0;
            }
        });

        return filtered;
    }, [properties, sortBy, priceRange, bedroomRange, selectedPropertyTypes, selectedSuburbs]);

    const togglePropertyType = (type: string) => {
        setSelectedPropertyTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const toggleSuburb = (suburb: string) => {
        setSelectedSuburbs(prev =>
            prev.includes(suburb) ? prev.filter(s => s !== suburb) : [...prev, suburb]
        );
    };

    const clearFilters = () => {
        setPriceRange([dataRanges.minPrice, dataRanges.maxPrice]);
        setBedroomRange([dataRanges.minBedrooms, dataRanges.maxBedrooms]);
        setSelectedPropertyTypes([]);
        setSelectedSuburbs([]);
    };

    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (priceRange[0] !== dataRanges.minPrice || priceRange[1] !== dataRanges.maxPrice) count++;
        if (bedroomRange[0] !== dataRanges.minBedrooms || bedroomRange[1] !== dataRanges.maxBedrooms) count++;
        if (selectedPropertyTypes.length > 0) count++;
        if (selectedSuburbs.length > 0) count++;
        return count;
    }, [priceRange, bedroomRange, selectedPropertyTypes, selectedSuburbs, dataRanges]);

    const displayedProperties = filteredAndSortedProperties.slice(0, displayCount);

    const handleFavoriteToggle = (index: number) => {
        setProperties(prev => prev.map((p, i) =>
            i === index ? { ...p, isFavorite: !p.isFavorite } : p
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header with Sort and Filter */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="text-lg font-semibold text-gray-900">
                        Showing {displayedProperties.length} of {filteredAndSortedProperties.length} properties
                    </div>

                    <div className="flex items-center gap-3">
                        <SortDropdown value={sortBy} onChange={setSortBy} />
                        <FilterToggleButton
                            showFilters={showFilters}
                            activeFilterCount={activeFilterCount}
                            onClick={() => setShowFilters(!showFilters)}
                        />
                    </div>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                            <button
                                onClick={clearFilters}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Clear All
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <PriceRangeFilter
                                priceRange={priceRange}
                                minPrice={dataRanges.minPrice}
                                maxPrice={dataRanges.maxPrice}
                                onPriceRangeChange={setPriceRange}
                            />

                            <BedroomFilter
                                bedroomRange={bedroomRange}
                                maxBedrooms={dataRanges.maxBedrooms}
                                onBedroomRangeChange={setBedroomRange}
                            />

                            <CheckboxFilter
                                label="Property Type"
                                options={dataRanges.propertyTypes}
                                selectedOptions={selectedPropertyTypes}
                                onToggle={togglePropertyType}
                            />

                            <CheckboxFilter
                                label="Suburbs"
                                options={dataRanges.suburbs}
                                selectedOptions={selectedSuburbs}
                                onToggle={toggleSuburb}
                            />
                        </div>
                    </div>
                )}

                {/* Property Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedProperties.map((property, index) => (
                        <MiniPropertyCard
                            key={index}
                            {...property}
                            onFavoriteToggle={() => handleFavoriteToggle(index)}
                        />
                    ))}
                </div>

                {/* Show More/Less Button */}
                {filteredAndSortedProperties.length > 6 && (
                    <div className="flex justify-center">
                        <button
                            onClick={() => setDisplayCount(prev =>
                                prev >= filteredAndSortedProperties.length ? 6 : prev + 6
                            )}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200"
                        >
                            {displayCount >= filteredAndSortedProperties.length ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// 'use client';
//
// import React, { useState, useRef } from 'react';
// import { ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, Bed, Bath, Car, Star } from 'lucide-react';
//
// import MiniPropertyCard from "@/components/Common/MiniPropertyCard";
// import PaginationButton from "@/components/Common/PaginationButton";
//
// import {PropertyCardProps} from "@/components/Common/MiniPropertyCard";
//
// // Property Types
// export type PropertyStatus = 'for-sale' | 'sold' | 'for-rent';
// export type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high';
//
//
//
// export interface PropertySubViewProps {
//     properties: PropertyCardProps[];
//     propertiesPerPage?: number;
//     onFiltersClick?: () => void;
//     onFavoriteToggle?: (propertyId: string | number) => void;
//     showSuburbFilter?: boolean;
//     showPropertyTypeFilter?: boolean;
//     showBedroomsFilter?: boolean;
// }
//
// // Sub-components
// interface FilterButtonProps {
//     label: string;
//     onClick: () => void;
//     isActive?: boolean;
// }
//
// const FilterButton: React.FC<FilterButtonProps> = ({ label, onClick, isActive = false }) => {
//     return (
//         <button
//             onClick={onClick}
//             className={`px-5 py-1 rounded-full font-medium text-xs transition-all ${
//                 isActive
//                     ? 'bg-blue-600 text-white shadow-md'
//                     : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
//             }`}
//         >
//             {label}
//             <ChevronDown className="w-4 h-4 inline-block ml-1.5" />
//         </button>
//     );
// };
//
// interface StatusTabProps {
//     label: string;
//     isActive: boolean;
//     onClick: () => void;
// }
//
// const StatusTab: React.FC<StatusTabProps> = ({ label, isActive, onClick }) => {
//     return (
//         <button
//             onClick={onClick}
//             className={`px-8 py-1 font-semibold text-sm uppercase  transition-all relative ${
//                 isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
//             }`}
//         >
//             {label}
//             {isActive && (
//                 <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
//             )}
//         </button>
//     );
// };
//
//
//
// // Main Component
// export default function PropertySubView({
//     properties = [],
//     propertiesPerPage = 9,
//     onFiltersClick,
//     onFavoriteToggle,
//     showSuburbFilter = true,
//     showPropertyTypeFilter = true,
//     showBedroomsFilter = true
// }: PropertySubViewProps) {
//
//     const [currentPage, setCurrentPage] = useState(1);
//     const [activeStatus, setActiveStatus] = useState<PropertyStatus>('for-sale');
//     const [sortBy, setSortBy] = useState<SortOption>('newest');
//     const [isOpen, setIsOpen] = useState(false);
//     const propertiesSectionRef = useRef<HTMLDivElement>(null);
//
//     const totalPages = Math.ceil(properties.length / propertiesPerPage);
//     const startProperty = (currentPage - 1) * propertiesPerPage + 1;
//     const endProperty = Math.min(currentPage * propertiesPerPage, properties.length);
//
//     const startIndex = (currentPage - 1) * propertiesPerPage;
//     const visibleProperties = properties.slice(startIndex, startIndex + propertiesPerPage);
//
//     const handlePageChange = (page: number) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//             if (propertiesSectionRef.current) {
//                 const yOffset = -20; // Optional: Add some padding from the top
//                 const y = propertiesSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
//                 window.scrollTo({ top: y, behavior: 'smooth' });
//             }
//         }
//     };
//
//     const handleSortChange = (sort: SortOption) => {
//         setSortBy(sort);
//         setIsOpen(false);
//     };
//
//     const getSortLabel = (sort: SortOption): string => {
//         const labels = {
//             newest: 'Newest',
//             oldest: 'Oldest',
//             'price-low': 'Price: Low to High',
//             'price-high': 'Price: High to Low'
//         };
//         return labels[sort];
//     };
//
//     return (
//         <div className="w-full max-w-7xl mx-auto px-4 py-6">
//             {/* Status Tabs */}
//             <div className="flex bg-white rounded-2xl shadow-sm mb-8 overflow-hidden">
//                 <StatusTab
//                     label="For Sale"
//                     isActive={activeStatus === 'for-sale'}
//                     onClick={() => setActiveStatus('for-sale')}
//                 />
//                 <StatusTab
//                     label="Sold"
//                     isActive={activeStatus === 'sold'}
//                     onClick={() => setActiveStatus('sold')}
//                 />
//                 <StatusTab
//                     label="For Rent"
//                     isActive={activeStatus === 'for-rent'}
//                     onClick={() => setActiveStatus('for-rent')}
//                 />
//             </div>
//
//             {/* Filters and Sort Bar */}
//             <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
//                 <div className="flex flex-wrap items-center gap-3">
//                     {/*<button*/}
//                     {/*    onClick={onFiltersClick}*/}
//                     {/*    className="px-5 py-2.5 bg-blue-600 text-white rounded-full font-medium text-sm hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"*/}
//                     {/*>*/}
//                     {/*    <SlidersHorizontal className="w-4 h-4" />*/}
//                     {/*    All Filters*/}
//                     {/*</button>*/}
//
//                     {showSuburbFilter && <FilterButton label="Suburb" onClick={() => {}} />}
//                     {showPropertyTypeFilter && <FilterButton label="Property Type" onClick={() => {}} />}
//                     {showBedroomsFilter && <FilterButton label="Bedrooms" onClick={() => {}} />}
//                 </div>
//
//                 <div className="relative">
//                     <button
//                         onClick={() => setIsOpen(!isOpen)}
//                         className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-full font-medium text-sm text-gray-700 hover:border-blue-300 transition-all flex items-center gap-3 min-w-[200px] justify-between shadow-sm"
//                     >
//             <span className="flex items-center gap-2">
//               <span className="text-gray-500 text-xs uppercase tracking-wide">Sort:</span>
//               <span className="text-blue-600 font-semibold">{getSortLabel(sortBy)}</span>
//             </span>
//                         <ChevronDown
//                             className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
//                         />
//                     </button>
//
//                     {isOpen && (
//                         <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-gray-100 rounded-2xl shadow-xl z-10 overflow-hidden">
//                             {(['newest', 'oldest', 'price-low', 'price-high'] as SortOption[]).map((option) => (
//                                 <button
//                                     key={option}
//                                     onClick={() => handleSortChange(option)}
//                                     className={`w-full px-5 py-3.5 text-left text-sm transition-colors ${
//                                         sortBy === option
//                                             ? 'bg-blue-50 text-blue-600 font-semibold'
//                                             : 'hover:bg-gray-50'
//                                     }`}
//                                 >
//                                     {getSortLabel(option)}
//                                 </button>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//
//             {/* Properties Grid */}
//             <div ref={propertiesSectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-8">
//                 {visibleProperties.length > 0 ? (
//                     visibleProperties.map((property, index) => (
//                         // <AgencyPropertyCard
//                         //     key={property.index}
//                         //     property={...property}
//                         //     onFavoriteToggle={onFavoriteToggle}
//                         // />
//                         <MiniPropertyCard
//                             key={index}
//                             {...property}
//                             // agencyColor={agencyColor}
//                             // isFavorite={favorites[index] || property.isFavorite}
//                             // onFavoriteToggle={() => toggleFavorite(index)}
//                         />
//                     ))
//                 ) : (
//                     <div className="col-span-full text-center py-12">
//                         <p className="text-gray-500 text-lg">No properties found</p>
//                     </div>
//                 )}
//             </div>
//
//             {/* Pagination */}
//             {totalPages > 1 && (
//                 <div className="flex items-center justify-center gap-2">
//                     <PaginationButton
//                         onClick={() => handlePageChange(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         variant="nav"
//                     >
//                         <ChevronLeft className="w-5 h-5" />
//                     </PaginationButton>
//
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
//                         if (
//                             page === 1 ||
//                             page === totalPages ||
//                             (page >= currentPage - 1 && page <= currentPage + 1)
//                         ) {
//                             return (
//                                 <PaginationButton
//                                     key={page}
//                                     onClick={() => handlePageChange(page)}
//                                     isActive={page === currentPage}
//                                 >
//                                     {page}
//                                 </PaginationButton>
//                             );
//                         } else if (page === currentPage - 2 || page === currentPage + 2) {
//                             return (
//                                 <span key={page} className="px-2 text-gray-400 font-bold">
//                   •••
//                 </span>
//                             );
//                         }
//                         return null;
//                     })}
//
//                     <PaginationButton
//                         onClick={() => handlePageChange(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                         variant="nav"
//                     >
//                         <ChevronRight className="w-5 h-5" />
//                     </PaginationButton>
//                 </div>
//             )}
//
//             {/* Results Summary */}
//             <div className="text-center text-sm font-medium text-gray-500 mt-6">
//                 Showing{' '}
//                 <span className="text-blue-600 font-semibold">
//           {startProperty}-{endProperty}
//         </span>{' '}
//                 of <span className="text-blue-600 font-semibold">{properties.length}</span> properties
//             </div>
//         </div>
//     );
// }
//
