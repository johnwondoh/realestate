'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface PropertyTypesFilterProps {
    values: string[];
    onChange: (values: string[]) => void;
    className?: string;
}

const propertyTypes = [
    'House',
    'Apartment',
    'Condo',
    'Townhouse',
    'Villa',
    'Land',
    'Retirement',
    'Block Of Units',
];

export default function PropertyTypesFilter({
    values,
    onChange,
    className = ''
}: PropertyTypesFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
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

    const handleToggle = (type: string) => {
        const newValues = values.includes(type)
            ? values.filter(v => v !== type)
            : [...values, type];
        onChange(newValues);
    };

    const handleClear = () => {
        onChange([]);
    };

    const getLabel = () => {
        if (values.length === 0) {
            return 'Property types';
        } else if (values.length === 1) {
            return values[0];
        } else {
            return `${values.length} types`;
        }
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
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg z-20 p-4 min-w-[220px]">
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {propertyTypes.map((type) => (
                            <label
                                key={type}
                                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                            >
                                <input
                                    type="checkbox"
                                    checked={values.includes(type)}
                                    onChange={() => handleToggle(type)}
                                    className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                                />
                                <span className="text-sm text-gray-700">{type}</span>
                            </label>
                        ))}
                    </div>
                    {values.length > 0 && (
                        <div className="pt-3 mt-3 border-t border-gray-200">
                            <button
                                onClick={handleClear}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
