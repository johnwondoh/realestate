import React from "react";

interface PriceRangeFilterProps {
    priceRange: [number, number];
    minPrice: number;
    maxPrice: number;
    onPriceRangeChange: (range: [number, number]) => void;
}

export default function PriceRangeFilter({
     priceRange,
     minPrice,
     maxPrice,
     onPriceRangeChange
}: PriceRangeFilterProps) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
                Price Range
            </label>
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <label className="text-xs text-gray-500 block mb-1">Min</label>
                        <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => onPriceRangeChange([Math.max(minPrice, parseInt(e.target.value) || 0), priceRange[1]])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Min"
                        />
                    </div>
                    <span className="text-gray-400 mt-6">-</span>
                    <div className="flex-1">
                        <label className="text-xs text-gray-500 block mb-1">Max</label>
                        <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => onPriceRangeChange([priceRange[0], Math.min(maxPrice, parseInt(e.target.value) || 0)])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Max"
                        />
                    </div>
                </div>
                <div className="text-xs text-gray-500">
                    ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}
                </div>
            </div>
        </div>
    );
}
