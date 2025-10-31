
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bed, Bath, Car, Star } from 'lucide-react';

import {PropertyAgencyCardProps} from "@/components/AgencyDetails/PropertyAgencyCard";
import PropertyAgencyCard from "@/components/AgencyDetails/PropertyAgencyCard";

// export interface PropertyFeatures {
//     bedrooms?: number;
//     bathrooms?: number;
//     parking?: number;
// }
//
// export interface PropertyAgencyCardProps {
//     image: string;
//     price: string;
//     address: string;
//     suburb: string;
//     state: string;
//     postcode?: string;
//     propertyType?: string;
//     features: PropertyFeatures;
//     agencyColor?: string;
//     isFavorite?: boolean;
//     onFavoriteToggle?: () => void;
// }
//
// const PropertyAgencyCard: React.FC<PropertyAgencyCardProps> = ({
//                                                                    image,
//                                                                    price,
//                                                                    address,
//                                                                    suburb,
//                                                                    state,
//                                                                    postcode,
//                                                                    propertyType,
//                                                                    features,
//                                                                    agencyColor = '#4a5568',
//                                                                    isFavorite = false,
//                                                                    onFavoriteToggle
//                                                                }) => {
//     const [isHovered, setIsHovered] = useState(false);
//
//     return (
//         <div
//             className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex-shrink-0 w-full"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//         >
//             {/* Image Section with Agency Color Bar */}
//             <div className="relative">
//                 <div
//                     className="h-2"
//                     style={{ backgroundColor: agencyColor }}
//                 />
//                 <div className="relative h-64 overflow-hidden">
//                     <img
//                         src={image}
//                         alt={address}
//                         className={`w-full h-full object-cover transition-transform duration-500 ${
//                             isHovered ? 'scale-110' : 'scale-100'
//                         }`}
//                     />
//                 </div>
//             </div>
//
//             {/* Content Section */}
//             <div className="p-6 space-y-4">
//                 {/* Price with Star */}
//                 <div className="flex items-center justify-between">
//                     <div className="text-2xl font-bold text-gray-900">
//                         {price}
//                     </div>
//                     <button
//                         onClick={onFavoriteToggle}
//                         className="p-2 hover:bg-gray-50 rounded-full transition-all duration-200 group"
//                         aria-label="Toggle favorite"
//                     >
//                         <Star
//                             className={`w-6 h-6 transition-all duration-200 ${
//                                 isFavorite
//                                     ? 'fill-yellow-400 stroke-yellow-400'
//                                     : 'stroke-gray-400 group-hover:stroke-yellow-400 group-hover:fill-yellow-50'
//                             }`}
//                         />
//                     </button>
//                 </div>
//
//                 {/* Address */}
//                 <div className="space-y-1">
//                     <div className="text-base font-medium text-gray-900">
//                         {address}
//                     </div>
//                     <div className="text-base text-gray-600 uppercase tracking-wide">
//                         {suburb} {state} {postcode}
//                     </div>
//                 </div>
//
//                 {/* Features and Property Type */}
//                 <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                     <div className="flex items-center gap-4 text-gray-700">
//                         {features.bedrooms !== undefined && (
//                             <div className="flex items-center gap-1.5">
//                                 <Bed className="w-5 h-5" />
//                                 <span className="text-base font-medium">{features.bedrooms}</span>
//                             </div>
//                         )}
//                         {features.bathrooms !== undefined && (
//                             <div className="flex items-center gap-1.5">
//                                 <Bath className="w-5 h-5" />
//                                 <span className="text-base font-medium">{features.bathrooms}</span>
//                             </div>
//                         )}
//                         {features.parking !== undefined && (
//                             <div className="flex items-center gap-1.5">
//                                 <Car className="w-5 h-5" />
//                                 <span className="text-base font-medium">{features.parking}</span>
//                             </div>
//                         )}
//                     </div>
//
//                     {propertyType && (
//                         <div className="text-sm font-medium text-gray-600">
//                             {propertyType}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

export interface AgencyPropertyViewerProps {
    properties: PropertyAgencyCardProps[];
    agencyColor?: string;
    cardsToShow?: number;
}

export default function AgencyPropertyViewer({
   properties,
   agencyColor = '#4a5568',
   cardsToShow = 2
}: AgencyPropertyViewerProps){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
    const [isMobile, setIsMobile] = useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const effectiveCardsToShow = isMobile ? 1.25 : cardsToShow;

    const goToPrevious = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) =>
            Math.min(properties.length - Math.floor(effectiveCardsToShow), prev + 1)
        );
    };

    const toggleFavorite = (index: number) => {
        setFavorites(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    if (!properties || properties.length === 0) {
        return <div className="text-center p-8 text-gray-500">No properties available</div>;
    }

    const canGoPrevious = currentIndex > 0;
    const canGoNext = currentIndex < properties.length - Math.floor(effectiveCardsToShow);

    const cardWidth = isMobile ? 80 : (100 / effectiveCardsToShow);
    const gap = isMobile ? 16 : 24;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <div className="relative">
                {/* Navigation Buttons */}
                {properties.length > Math.floor(effectiveCardsToShow) && (
                    <>
                        <button
                            onClick={goToPrevious}
                            disabled={!canGoPrevious}
                            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
                                canGoPrevious
                                    ? 'hover:bg-gray-50 cursor-pointer'
                                    : 'opacity-40 cursor-not-allowed'
                            }`}
                            aria-label="Previous properties"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>

                        <button
                            onClick={goToNext}
                            disabled={!canGoNext}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
                                canGoNext
                                    ? 'hover:bg-gray-50 cursor-pointer'
                                    : 'opacity-40 cursor-not-allowed'
                            }`}
                            aria-label="Next properties"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    </>
                )}

                {/* Carousel Container */}
                <div className="overflow-hidden">
                    <div
                        className={`flex ${isMobile ? 'gap-4' : 'gap-6'} transition-transform duration-500 ease-out`}
                        style={{
                            transform: `translateX(calc(-${currentIndex * cardWidth}% - ${currentIndex * gap}px))`
                        }}
                    >
                        {properties.map((property, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0"
                                style={{ width: `${cardWidth}%` }}
                            >
                                <PropertyAgencyCard
                                    {...property}
                                    agencyColor={agencyColor}
                                    isFavorite={favorites[index] || property.isFavorite}
                                    onFavoriteToggle={() => toggleFavorite(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Indicator */}
                {properties.length > Math.floor(effectiveCardsToShow) && (
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: properties.length - Math.floor(effectiveCardsToShow) + 1 }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? 'w-8 bg-gray-800'
                                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
//
// // Demo component
// const Demo2 = () => {
//     const properties: PropertyAgencyCardProps[] = [
//         {
//             image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
//             price: '$730,000 - $760,000',
//             address: '7 Ashfield Street',
//             suburb: 'Mount Barker',
//             state: 'SA',
//             postcode: '5251',
//             propertyType: 'House',
//             features: { bedrooms: 3, bathrooms: 2, parking: 2 }
//         },
//         {
//             image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
//             price: '$740,000 - $780,000',
//             address: '101 Princes Highway',
//             suburb: 'Littlehampton',
//             state: 'SA',
//             propertyType: 'House',
//             features: { bedrooms: 3, bathrooms: 1, parking: 3 }
//         },
//         {
//             image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
//             price: '$520,000 - $550,000',
//             address: '25 Garden Avenue',
//             suburb: 'Adelaide',
//             state: 'SA',
//             postcode: '5000',
//             propertyType: 'Apartment',
//             features: { bedrooms: 2, bathrooms: 2, parking: 1 }
//         },
//         {
//             image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
//             price: '$895,000',
//             address: '42 Coastal Drive',
//             suburb: 'Glenelg',
//             state: 'SA',
//             postcode: '5045',
//             propertyType: 'Villa',
//             features: { bedrooms: 4, bathrooms: 2, parking: 2 }
//         },
//         {
//             image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
//             price: '$650,000',
//             address: '88 Beach Road',
//             suburb: 'Henley Beach',
//             state: 'SA',
//             postcode: '5022',
//             propertyType: 'Townhouse',
//             features: { bedrooms: 3, bathrooms: 2, parking: 2 }
//         }
//     ];
//
//     return (
//         <div className="min-h-screen bg-gray-50 py-12">
//             <div className="max-w-7xl mx-auto px-4 mb-12">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                     NITSCHKE REAL ESTATE FEATURED PROPERTIES
//                 </h1>
//                 <p className="text-gray-600">Browse our featured properties</p>
//             </div>
//
//             <AgencyPropertyViewer
//                 properties={properties}
//                 agencyColor="#4a5568"
//                 cardsToShow={2}
//             />
//         </div>
//     );
// };
//
// export default Demo2;

// --------------------------------------------------

// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight, Bed, Bath, Car, Star } from 'lucide-react';
//
// export interface PropertyFeatures {
//     bedrooms?: number;
//     bathrooms?: number;
//     parking?: number;
// }
//
// export interface PropertyAgencyCardProps {
//     image: string;
//     price: string;
//     address: string;
//     suburb: string;
//     state: string;
//     postcode?: string;
//     propertyType?: string;
//     features: PropertyFeatures;
//     agencyColor?: string;
//     isFavorite?: boolean;
//     onFavoriteToggle?: () => void;
// }
//
// const PropertyAgencyCard: React.FC<PropertyAgencyCardProps> = ({
//                                                                    image,
//                                                                    price,
//                                                                    address,
//                                                                    suburb,
//                                                                    state,
//                                                                    postcode,
//                                                                    propertyType,
//                                                                    features,
//                                                                    agencyColor = '#4a5568',
//                                                                    isFavorite = false,
//                                                                    onFavoriteToggle
//                                                                }) => {
//     const [isHovered, setIsHovered] = useState(false);
//
//     return (
//         <div
//             className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex-shrink-0 w-full"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//         >
//             {/* Image Section with Agency Color Bar */}
//             <div className="relative">
//                 <div
//                     className="h-2"
//                     style={{ backgroundColor: agencyColor }}
//                 />
//                 <div className="relative h-64 overflow-hidden">
//                     <img
//                         src={image}
//                         alt={address}
//                         className={`w-full h-full object-cover transition-transform duration-500 ${
//                             isHovered ? 'scale-110' : 'scale-100'
//                         }`}
//                     />
//                 </div>
//             </div>
//
//             {/* Content Section */}
//             <div className="p-6 space-y-4">
//                 {/* Price with Star */}
//                 <div className="flex items-center justify-between">
//                     <div className="text-2xl font-bold text-gray-900">
//                         {price}
//                     </div>
//                     <button
//                         onClick={onFavoriteToggle}
//                         className="p-2 hover:bg-gray-50 rounded-full transition-all duration-200 group"
//                         aria-label="Toggle favorite"
//                     >
//                         <Star
//                             className={`w-6 h-6 transition-all duration-200 ${
//                                 isFavorite
//                                     ? 'fill-yellow-400 stroke-yellow-400'
//                                     : 'stroke-gray-400 group-hover:stroke-yellow-400 group-hover:fill-yellow-50'
//                             }`}
//                         />
//                     </button>
//                 </div>
//
//                 {/* Address */}
//                 <div className="space-y-1">
//                     <div className="text-base font-medium text-gray-900">
//                         {address}
//                     </div>
//                     <div className="text-base text-gray-600 uppercase tracking-wide">
//                         {suburb} {state} {postcode}
//                     </div>
//                 </div>
//
//                 {/* Features and Property Type */}
//                 <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                     <div className="flex items-center gap-4 text-gray-700">
//                         {features.bedrooms !== undefined && (
//                             <div className="flex items-center gap-1.5">
//                                 <Bed className="w-5 h-5" />
//                                 <span className="text-base font-medium">{features.bedrooms}</span>
//                             </div>
//                         )}
//                         {features.bathrooms !== undefined && (
//                             <div className="flex items-center gap-1.5">
//                                 <Bath className="w-5 h-5" />
//                                 <span className="text-base font-medium">{features.bathrooms}</span>
//                             </div>
//                         )}
//                         {features.parking !== undefined && (
//                             <div className="flex items-center gap-1.5">
//                                 <Car className="w-5 h-5" />
//                                 <span className="text-base font-medium">{features.parking}</span>
//                             </div>
//                         )}
//                     </div>
//
//                     {propertyType && (
//                         <div className="text-sm font-medium text-gray-600">
//                             {propertyType}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export interface AgencyPropertyViewerProps {
//     properties: PropertyAgencyCardProps[];
//     agencyColor?: string;
//     cardsToShow?: number;
// }
//
// const AgencyPropertyViewer: React.FC<AgencyPropertyViewerProps> = ({
//                                                                        properties,
//                                                                        agencyColor = '#4a5568',
//                                                                        cardsToShow = 2
//                                                                    }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
//     const [isMobile, setIsMobile] = useState(false);
//
//     React.useEffect(() => {
//         const checkMobile = () => {
//             setIsMobile(window.innerWidth < 768);
//         };
//
//         checkMobile();
//         window.addEventListener('resize', checkMobile);
//         return () => window.removeEventListener('resize', checkMobile);
//     }, []);
//
//     const effectiveCardsToShow = isMobile ? 1.25 : cardsToShow;
//
//     const goToPrevious = () => {
//         setCurrentIndex((prev) => Math.max(0, prev - 1));
//     };
//
//     const goToNext = () => {
//         setCurrentIndex((prev) =>
//             Math.min(properties.length - Math.floor(effectiveCardsToShow), prev + 1)
//         );
//     };
//
//     const toggleFavorite = (index: number) => {
//         setFavorites(prev => ({
//             ...prev,
//             [index]: !prev[index]
//         }));
//     };
//
//     if (!properties || properties.length === 0) {
//         return <div className="text-center p-8 text-gray-500">No properties available</div>;
//     }
//
//     const canGoPrevious = currentIndex > 0;
//     const canGoNext = currentIndex < properties.length - Math.floor(effectiveCardsToShow);
//
//     const cardWidth = isMobile ? 80 : (100 / effectiveCardsToShow);
//     const gap = isMobile ? 16 : 24;
//
//     return (
//         <div className="w-full max-w-7xl mx-auto px-4 py-8">
//             <div className="relative">
//                 {/* Navigation Buttons */}
//                 {properties.length > Math.floor(effectiveCardsToShow) && (
//                     <>
//                         <button
//                             onClick={goToPrevious}
//                             disabled={!canGoPrevious}
//                             className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
//                                 canGoPrevious
//                                     ? 'hover:bg-gray-50 cursor-pointer'
//                                     : 'opacity-40 cursor-not-allowed'
//                             }`}
//                             aria-label="Previous properties"
//                         >
//                             <ChevronLeft className="w-6 h-6 text-gray-700" />
//                         </button>
//
//                         <button
//                             onClick={goToNext}
//                             disabled={!canGoNext}
//                             className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
//                                 canGoNext
//                                     ? 'hover:bg-gray-50 cursor-pointer'
//                                     : 'opacity-40 cursor-not-allowed'
//                             }`}
//                             aria-label="Next properties"
//                         >
//                             <ChevronRight className="w-6 h-6 text-gray-700" />
//                         </button>
//                     </>
//                 )}
//
//                 {/* Carousel Container */}
//                 <div className="overflow-hidden">
//                     <div
//                         className={`flex ${isMobile ? 'gap-4' : 'gap-6'} transition-transform duration-500 ease-out`}
//                         style={{
//                             transform: `translateX(calc(-${currentIndex * cardWidth}% - ${currentIndex * gap}px))`
//                         }}
//                     >
//                         {properties.map((property, index) => (
//                             <div
//                                 key={index}
//                                 className="flex-shrink-0"
//                                 style={{ width: `${cardWidth}%` }}
//                             >
//                                 <PropertyAgencyCard
//                                     {...property}
//                                     agencyColor={agencyColor}
//                                     isFavorite={favorites[index] || property.isFavorite}
//                                     onFavoriteToggle={() => toggleFavorite(index)}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//
//                 {/* Progress Indicator */}
//                 {properties.length > Math.floor(effectiveCardsToShow) && (
//                     <div className="flex justify-center gap-2 mt-8">
//                         {Array.from({ length: properties.length - Math.floor(effectiveCardsToShow) + 1 }).map((_, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => setCurrentIndex(index)}
//                                 className={`h-2 rounded-full transition-all duration-300 ${
//                                     index === currentIndex
//                                         ? 'w-8 bg-gray-800'
//                                         : 'w-2 bg-gray-300 hover:bg-gray-400'
//                                 }`}
//                                 aria-label={`Go to slide ${index + 1}`}
//                             />
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// // Demo component
// const Demo = () => {
//     const properties: PropertyAgencyCardProps[] = [
//         {
//             image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
//             price: '$730,000 - $760,000',
//             address: '7 Ashfield Street',
//             suburb: 'Mount Barker',
//             state: 'SA',
//             postcode: '5251',
//             propertyType: 'House',
//             features: { bedrooms: 3, bathrooms: 2, parking: 2 }
//         },
//         {
//             image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
//             price: '$740,000 - $780,000',
//             address: '101 Princes Highway',
//             suburb: 'Littlehampton',
//             state: 'SA',
//             propertyType: 'House',
//             features: { bedrooms: 3, bathrooms: 1, parking: 3 }
//         },
//         {
//             image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
//             price: '$520,000 - $550,000',
//             address: '25 Garden Avenue',
//             suburb: 'Adelaide',
//             state: 'SA',
//             postcode: '5000',
//             propertyType: 'Apartment',
//             features: { bedrooms: 2, bathrooms: 2, parking: 1 }
//         },
//         {
//             image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
//             price: '$895,000',
//             address: '42 Coastal Drive',
//             suburb: 'Glenelg',
//             state: 'SA',
//             postcode: '5045',
//             propertyType: 'Villa',
//             features: { bedrooms: 4, bathrooms: 2, parking: 2 }
//         },
//         {
//             image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
//             price: '$650,000',
//             address: '88 Beach Road',
//             suburb: 'Henley Beach',
//             state: 'SA',
//             postcode: '5022',
//             propertyType: 'Townhouse',
//             features: { bedrooms: 3, bathrooms: 2, parking: 2 }
//         }
//     ];
//
//     return (
//         <div className="min-h-screen bg-gray-50 py-12">
//             <div className="max-w-7xl mx-auto px-4 mb-12">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                     NITSCHKE REAL ESTATE FEATURED PROPERTIES
//                 </h1>
//                 <p className="text-gray-600">Browse our featured properties</p>
//             </div>
//
//             <AgencyPropertyViewer
//                 properties={properties}
//                 agencyColor="#4a5568"
//                 cardsToShow={2}
//             />
//         </div>
//     );
// };
//
// export default Demo;