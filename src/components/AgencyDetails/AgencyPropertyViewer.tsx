
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bed, Bath, Car, Star } from 'lucide-react';

// import {PropertyAgencyCardProps} from "@/components/Common/MiniPropertyCard";
import {PropertyCardProps} from "@/components/Common/MiniPropertyCard";
import MiniPropertyCard from "@/components/Common/MiniPropertyCard";

export interface AgencyPropertyViewerProps {
    properties: PropertyCardProps[];
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
                                <MiniPropertyCard
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
