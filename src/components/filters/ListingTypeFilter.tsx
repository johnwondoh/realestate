'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface ListingTypeFilterProps {
    value: 'buy' | 'rent' | 'sold';
    onChange: (value: 'buy' | 'rent' | 'sold') => void;
    className?: string;
}

const options = [
    { label: 'Buy', value: 'buy' as const },
    { label: 'Rent', value: 'rent' as const },
    { label: 'Sold', value: 'sold' as const },
];

export default function ListingTypeFilter({
    value,
    onChange,
    className = ''
}: ListingTypeFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedLabel = options.find(opt => opt.value === value)?.label || 'Buy';

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

    const handleSelect = (newValue: 'buy' | 'rent' | 'sold') => {
        onChange(newValue);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-50 transition-colors ${
                    value === 'buy' ? 'border-green-600 bg-white' : 'border-gray-300'
                }`}
            >
                <span className={`font-medium text-sm ${value === 'buy' ? 'text-green-700' : 'text-gray-800'}`}>
                    {selectedLabel}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform ${value === 'buy' ? 'text-green-700' : 'text-gray-700'} ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg z-20 overflow-hidden min-w-[120px]">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors ${
                                value === option.value ? 'bg-gray-100 font-semibold' : ''
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
