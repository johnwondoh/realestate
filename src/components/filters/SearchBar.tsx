'use client';

import { useState, KeyboardEvent } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
    initialLocations?: string[];
    onSearch: (locations: string[]) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchBar({
    initialLocations = [],
    onSearch,
    placeholder = 'Add another location...',
    className = ''
}: SearchBarProps) {
    const [locations, setLocations] = useState<string[]>(initialLocations);
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            const newLocations = [...locations, inputValue.trim()];
            setLocations(newLocations);
            setInputValue('');
        }
    };

    const removeLocation = (indexToRemove: number) => {
        const newLocations = locations.filter((_, index) => index !== indexToRemove);
        setLocations(newLocations);
    };

    const handleSearch = () => {
        onSearch(locations);
    };

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <div className="flex w-full max-w-4xl items-center border-b border-gray-300 bg-white overflow-hidden">
                <div className="flex flex-1 flex-wrap items-center p-2">
                    {locations.map((location, index) => (
                        <div
                            key={index}
                            className="m-1 flex items-center rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800"
                        >
                            <span>{location}</span>
                            <button
                                type="button"
                                onClick={() => removeLocation(index)}
                                className="ml-2 flex-shrink-0 text-gray-500 hover:text-gray-800 focus:outline-none"
                                aria-label={`Remove ${location}`}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}

                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="min-w-[200px] flex-1 bg-transparent p-2 text-sm text-gray-900 placeholder-gray-500 outline-none"
                    />
                </div>
            </div>

            <button
                onClick={handleSearch}
                className="px-6 py-3 bg-red text-white rounded-lg text-sm font-medium hover:bg-red/90 transition-colors whitespace-nowrap"
            >
                Search
            </button>
        </div>
    );
}
