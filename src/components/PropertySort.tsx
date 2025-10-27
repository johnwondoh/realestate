import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface PropertySortProps {
    options?: string[];
    defaultValue?: string;
    onChange?: (value: string) => void;
}

export default function PropertySort({
                          options = ['Featured', 'Price (Low to High)', 'Price (High to Low)', 'Newest', 'Oldest'],
                          defaultValue = 'Featured',
                          onChange
                      }: PropertySortProps) {
    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange?.(option);
    };

    return (
        <div className="flex items-center gap-3">
            <label className="text-base font-semibold text-gray-800">Sort</label>

            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between gap-4 px-6 py-1 border-2 border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-colors min-w-[200px]"
                >
                    <span className="text-base text-gray-800">{selectedOption}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-700 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Options */}
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-lg z-20 overflow-hidden">
                            {options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleSelect(option)}
                                    className={`w-full px-6 py-3 text-left text-lg hover:bg-gray-50 transition-colors ${
                                        selectedOption === option ? 'bg-gray-100 font-semibold' : ''
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// Example usage
// const PropertySortExample = () => {
//     return (
//         <div className="p-8 bg-gray-50">
//             <PropertySort
//                 onChange={(value) => console.log('Selected:', value)}
//             />
//         </div>
//     );
// };

// export default PropertySortExample;