"use client";

import { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';

export default function MultiLocationSearch() {
    // 1. State for the array of search parameters (tags)
    const [tags, setTags] = useState([
        'Mawson Lakes, SA, 5095',
        'Parafield Gardens, SA, 5107',
    ]);

    // 2. State for the current value in the text input
    const [inputValue, setInputValue] = useState('');

    /**
     * Handles adding a new tag when 'Enter' is pressed.
     */
    const handleKeyDown = (e) => {
        // Check if the key is 'Enter' and the input isn't empty
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault(); // Prevent form submission

            // Add the new tag to the state array
            setTags([...tags, inputValue.trim()]);

            // Clear the input field
            setInputValue('');
        }
    };

    /**
     * Removes a tag from the array by its index.
     */
    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div>
        <div className="flex items-center gap-4">
        {/*<div className="flex w-full max-w-4xl items-center rounded-lg border border-gray-300 bg-white shadow-sm overflow-hidden">*/}
        <div className="flex w-full max-w-4xl items-center  border-b border-gray-300 bg-white  overflow-hidden">
            {/* Wrapper for tags and input */}
            {/*<div className="flex flex-1 flex-wrap items-center p-2">*/}
            <div className="flex flex-1 flex-wrap items-center p-2">

                {/* 3. Map over the tags array to display them */}
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="m-1 flex items-center rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800"
                    >
                        <span>{tag}</span>
                        {/* 4. 'X' button to remove the tag */}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="ml-2 flex-shrink-0 text-gray-500 hover:text-gray-800 focus:outline-none"
                            aria-label={`Remove ${tag}`}
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}

                {/* 5. The text input field */}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add another location..."
                    className="min-w-[200px] flex-1 bg-transparent p-2 text-sm text-gray-900 placeholder-gray-500 outline-none"
                />
            </div>

            {/* 6. The green search button */}

        </div>
            <button
                // onClick={handleSearch}
                // className="px-6 py-3 bg-red text-white rounded-full text-body-medium font-medium hover:bg-red/90 transition-colors"
                className="px-6 py-3 bg-red text-white rounded-lg text-body-medium font-medium hover:bg-red/90 transition-colors"
            >
                Search
            </button>
            {/*<button*/}
            {/*    type="button"*/}
            {/*    className="flex items-center justify-center self-stretch bg-green-600 px-4 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"*/}
            {/*    aria-label="Search"*/}
            {/*>*/}
            {/*    <Search size={22} />*/}
            {/*</button>*/}
        </div>

            {/* Filter Buttons */}
            <div className="flex items-center py-3 gap-2">
                 {/* Filters */}
                 <button className="flex items-center gap-2 px-5 py-1 border-1 border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                     <SlidersHorizontal className="w-5 h-5 text-gray-700" />
                     <span className="font-medium text-sm text-gray-800">Filters</span>
                 </button>

                 {/* Buy */}
                 <button className="flex items-center gap-2 px-2 py-1 border-1 border-green-600 bg-white rounded-full hover:bg-green-50 transition-colors">
                     <span className="font-medium text-sm text-green-700">Buy</span>
                     <ChevronDown className="w-5 h-5 text-green-700" />
                 </button>

                 {/* Price */}
                 <button className="flex items-center gap-2 px-2 py-1 border-1 border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                     <span className="font-medium text-sm text-gray-800">Price</span>
                     <ChevronDown className="w-5 h-5 text-gray-700" />
                 </button>

                 {/* Beds */}
                 <button className="flex items-center gap-2 px-2 py-1 border-1 border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                     <span className="font-medium text-sm text-gray-800">Beds</span>
                     <ChevronDown className="w-5 h-5 text-gray-700" />
                 </button>

                 {/* Property types */}
                 <button className="flex items-center gap-2 px-2 py-1 border-1 border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                     <span className="font-medium text-sm text-gray-800">Property types</span>
                     <ChevronDown className="w-5 h-5 text-gray-700" />
                 </button>
             </div>
        </div>
    );
}


// import { useState } from 'react';
// import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
//
// const SearchFiltersComponent = () => {
//     const [locations, setLocations] = useState(['Mawson Lakes, SA, 5095']);
//     const [searchInput, setSearchInput] = useState('');
//     const [isSearchFocused, setIsSearchFocused] = useState(false);
//
//     const handleAddLocation = (e) => {
//         if (e.key === 'Enter' && searchInput.trim()) {
//             setLocations([...locations, searchInput.trim()]);
//             setSearchInput('');
//         }
//     };
//
//     const handleRemoveLocation = (indexToRemove) => {
//         setLocations(locations.filter((_, index) => index !== indexToRemove));
//     };
//
//     return (
//         <div className="w-full bg-white p-4">
//             <div className="max-w-7xl mx-auto flex items-center gap-3">
//
//                 {/* Search Bar */}
//                 <div className="flex-1 flex items-center bg-white border-2 border-gray-300 rounded-xl overflow-hidden focus-within:border-green-500">
//
//                     {/* Location Tags */}
//                     <div className="flex items-center flex-wrap gap-2 px-4 py-3 flex-1 bg-gray-50">
//                         {locations.map((location, index) => (
//                             <div
//                                 key={index}
//                                 className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg shadow-sm"
//                             >
//                                 <span className="text-gray-700 font-medium">{location}</span>
//                                 <button
//                                     onClick={() => handleRemoveLocation(index)}
//                                     className="text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full p-0.5"
//                                     aria-label="Remove location"
//                                 >
//                                     <X className="w-4 h-4" />
//                                 </button>
//                             </div>
//                         ))}
//
//                         {/* Input for adding new locations */}
//                         <input
//                             type="text"
//                             value={searchInput}
//                             onChange={(e) => setSearchInput(e.target.value)}
//                             onKeyDown={handleAddLocation}
//                             onFocus={() => setIsSearchFocused(true)}
//                             onBlur={() => setIsSearchFocused(false)}
//                             placeholder={locations.length === 0 ? "Search locations..." : ""}
//                             className="flex-1 min-w-[200px] outline-none text-gray-800 placeholder-gray-400 bg-transparent"
//                         />
//                     </div>
//
//                     {/* Search Button */}
//                     <button className="bg-green-600 hover:bg-green-700 px-6 py-4 transition-colors flex items-center justify-center">
//                         <Search className="w-6 h-6 text-white" strokeWidth={2.5} />
//                     </button>
//                 </div>
//
//                 {/* Filter Buttons */}
//                 <div className="flex items-center gap-2">
//                     {/* Filters */}
//                     <button className="flex items-center gap-2 px-2 py-1 border-1 border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
//                         <SlidersHorizontal className="w-5 h-5 text-gray-700" />
//                         <span className="font-semibold text-gray-800">Filters</span>
//                     </button>
//
//                     {/* Buy */}
//                     <button className="flex items-center gap-2 px-2 py-1 border-1 border-green-600 bg-white rounded-full hover:bg-green-50 transition-colors">
//                         <span className="font-semibold text-green-700">Buy</span>
//                         <ChevronDown className="w-5 h-5 text-green-700" />
//                     </button>
//
//                     {/* Price */}
//                     <button className="flex items-center gap-2 px-2 py-1 border-1 border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
//                         <span className="font-semibold text-sm text-gray-800">Price</span>
//                         <ChevronDown className="w-5 h-5 text-gray-700" />
//                     </button>
//
//                     {/* Beds */}
//                     <button className="flex items-center gap-2 px-2 py-1 border-1 border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
//                         <span className="font-semibold text-sm text-gray-800">Beds</span>
//                         <ChevronDown className="w-5 h-5 text-gray-700" />
//                     </button>
//
//                     {/* Property types */}
//                     <button className="flex items-center gap-2 px-2 py-1 border-1 border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
//                         <span className="font-semibold text-sm text-gray-800">Property types</span>
//                         <ChevronDown className="w-5 h-5 text-gray-700" />
//                     </button>
//                 </div>
//             </div>
//
//
//         </div>
//     );
// };
//
// export default SearchFiltersComponent;