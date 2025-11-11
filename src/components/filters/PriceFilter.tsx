'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface PriceFilterProps {
    minPrice?: number;
    maxPrice?: number;
    onChange: (minPrice?: number, maxPrice?: number) => void;
    className?: string;
}

export default function PriceFilter({
    minPrice,
    maxPrice,
    onChange,
    className = ''
}: PriceFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [tempMinPrice, setTempMinPrice] = useState<string>(minPrice?.toString() || '');
    const [tempMaxPrice, setTempMaxPrice] = useState<string>(maxPrice?.toString() || '');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleApply = () => {
        const min = tempMinPrice ? parseFloat(tempMinPrice) : undefined;
        const max = tempMaxPrice ? parseFloat(tempMaxPrice) : undefined;
        onChange(min, max);
        setIsOpen(false);
    };

    const handleClear = () => {
        setTempMinPrice('');
        setTempMaxPrice('');
        onChange(undefined, undefined);
        setIsOpen(false);
    };

    const getLabel = () => {
        if (minPrice && maxPrice) {
            return `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()}`;
        } else if (minPrice) {
            return `$${minPrice.toLocaleString()}+`;
        } else if (maxPrice) {
            return `Up to $${maxPrice.toLocaleString()}`;
        }
        return 'Price';
    };

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
                <span className="font-medium text-sm text-gray-800">{getLabel()}</span>
                <ChevronDown className={`w-5 h-5 text-gray-700 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg z-20 p-4 min-w-[280px]">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Min Price</label>
                            <input
                                type="number"
                                value={tempMinPrice}
                                onChange={(e) => setTempMinPrice(e.target.value)}
                                placeholder="No min"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Max Price</label>
                            <input
                                type="number"
                                value={tempMaxPrice}
                                onChange={(e) => setTempMaxPrice(e.target.value)}
                                placeholder="No max"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={handleClear}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Clear
                            </button>
                            <button
                                onClick={handleApply}
                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
