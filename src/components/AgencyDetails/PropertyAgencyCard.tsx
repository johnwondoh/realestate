import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bed, Bath, Car, Star } from 'lucide-react';

export interface PropertyFeatures {
    bedrooms?: number;
    bathrooms?: number;
    parking?: number;
}

export interface PropertyAgencyCardProps {
    image: string;
    price: string;
    address: string;
    suburb: string;
    state: string;
    postcode?: string;
    propertyType?: string;
    features: PropertyFeatures;
    agencyColor?: string;
    isFavorite?: boolean;
    onFavoriteToggle?: () => void;
}

export default function PropertyAgencyCard({
   image,
   price,
   address,
   suburb,
   state,
   postcode,
   propertyType,
   features,
   agencyColor = '#4a5568',
   isFavorite = false,
   onFavoriteToggle
}: PropertyAgencyCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex-shrink-0 w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Section with Agency Color Bar */}
            <div className="relative">
                <div
                    className="h-2"
                    style={{ backgroundColor: agencyColor }}
                />
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={image}
                        alt={address}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                            isHovered ? 'scale-110' : 'scale-100'
                        }`}
                    />
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
                {/* Price with Star */}
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">
                        {price}
                    </div>
                    <button
                        onClick={onFavoriteToggle}
                        className="p-2 hover:bg-gray-50 rounded-full transition-all duration-200 group"
                        aria-label="Toggle favorite"
                    >
                        <Star
                            className={`w-6 h-6 transition-all duration-200 ${
                                isFavorite
                                    ? 'fill-yellow-400 stroke-yellow-400'
                                    : 'stroke-gray-400 group-hover:stroke-yellow-400 group-hover:fill-yellow-50'
                            }`}
                        />
                    </button>
                </div>

                {/* Address */}
                <div className="space-y-1">
                    <div className="text-base font-medium text-gray-900">
                        {address}
                    </div>
                    <div className="text-base text-gray-600 uppercase tracking-wide">
                        {suburb} {state} {postcode}
                    </div>
                </div>

                {/* Features and Property Type */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-gray-700">
                        {features.bedrooms !== undefined && (
                            <div className="flex items-center gap-1.5">
                                <Bed className="w-5 h-5" />
                                <span className="text-base font-medium">{features.bedrooms}</span>
                            </div>
                        )}
                        {features.bathrooms !== undefined && (
                            <div className="flex items-center gap-1.5">
                                <Bath className="w-5 h-5" />
                                <span className="text-base font-medium">{features.bathrooms}</span>
                            </div>
                        )}
                        {features.parking !== undefined && (
                            <div className="flex items-center gap-1.5">
                                <Car className="w-5 h-5" />
                                <span className="text-base font-medium">{features.parking}</span>
                            </div>
                        )}
                    </div>

                    {propertyType && (
                        <div className="text-sm font-medium text-gray-600">
                            {propertyType}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
