import {SlidersHorizontal} from "lucide-react";
import React from "react";

interface FilterToggleButtonProps {
    showFilters: boolean;
    activeFilterCount: number;
    onClick: () => void;
}

export default function FilterToggleButton({
    showFilters,
    activeFilterCount,
    onClick
}: FilterToggleButtonProps) {
    return (
        <button
            onClick={onClick}
            className="relative bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
        >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                </span>
            )}
        </button>
    );
}