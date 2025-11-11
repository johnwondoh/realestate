'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

interface PropertySortProps {
    options?: Array<{ label: string; value: string }>;
    defaultValue?: string;
}

export default function PropertySort({
                                         options = [
                                             { label: 'Featured', value: 'featured' },
                                             { label: 'Price (Low to High)', value: 'price-low' },
                                             { label: 'Price (High to Low)', value: 'price-high' },
                                             { label: 'Newest', value: 'newest' },
                                             { label: 'Oldest', value: 'oldest' },
                                         ],
                                         defaultValue = 'featured'
                                     }: PropertySortProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get('sortBy') || defaultValue;

    const [isOpen, setIsOpen] = useState(false);

    const selectedLabel = options.find(opt => opt.value === currentSort)?.label || 'Featured';

    const handleSelect = (value: string) => {
        setIsOpen(false);
        const params = new URLSearchParams(searchParams);
        params.set('sortBy', value);
        params.delete('page');
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-3">
            <label className="text-base font-semibold text-gray-800">Sort</label>

            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between gap-4 px-6 py-1 border-2 border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-colors min-w-[200px]"
                >
                    <span className="text-base text-gray-800">{selectedLabel}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-700 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />

                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-lg z-20 overflow-hidden">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    className={`w-full px-6 py-3 text-left text-lg hover:bg-gray-50 transition-colors ${
                                        currentSort === option.value ? 'bg-gray-100 font-semibold' : ''
                                    }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
