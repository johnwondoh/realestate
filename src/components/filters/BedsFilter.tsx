'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface BedsFilterProps {
    value?: number;
    onChange: (value?: number) => void;
    className?: string;
}

const options = [
    { label: 'Any', value: undefined },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4+', value: 4 },
];

export default function BedsFilter({
    value,
    onChange,
    className = ''
}: BedsFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedLabel = options.find(opt => opt.value === value)?.label || 'Beds';

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

    const handleSelect = (newValue?: number) => {
        onChange(newValue);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
                <span className="font-medium text-sm text-gray-800">{selectedLabel}</span>
                <ChevronDown className={`w-5 h-5 text-gray-700 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg z-20 overflow-hidden min-w-[100px]">
                    {options.map((option, index) => (
                        <button
                            key={index}
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
