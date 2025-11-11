import {ChevronDown} from "lucide-react";
import React from "react";

interface CheckboxFilterProps {
    label: string;
    options: string[];
    selectedOptions: string[];
    onToggle: (option: string) => void;
}

export default function CheckboxFilter({
    label,
    options,
    selectedOptions,
    onToggle
}: CheckboxFilterProps) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="space-y-2">
                {options.map(option => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedOptions.includes(option)}
                            onChange={() => onToggle(option)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
