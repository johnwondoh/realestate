import { Star } from 'lucide-react';

export interface PropertySearchSummaryProps {
    title: string;
    totalProperties: number;
    currentPage?: number;
    pageSize?: number;
}

export default function PropertySearchSummary({
        title,
        totalProperties,
        currentPage = 1,
        pageSize = 25
    }: PropertySearchSummaryProps){
    const startIndex = (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(currentPage * pageSize, totalProperties);

    return (
        <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-start justify-between gap-6">
                {/* Left side - Title and count */}
                <div className="flex-1">
                    <h4 className="text-base md:text-base font-semibold text-gray-700 mb-3">
                        {title}
                    </h4>
                    <p className="text-xs text-gray-600">
                        Showing {startIndex} – {endIndex} of {totalProperties} properties
                    </p>
                </div>

                {/* Right side - Save search button */}
                <button className="flex items-center gap-3 px-4 py-1 border-1 border-gray-600 rounded-md hover:bg-gray-50 transition-colors flex-shrink-0">
                    <Star className="w-4 h-4 text-gray-700" />
                    <span className="text-base font-semibold text-gray-800">Save search</span>
                </button>
            </div>
        </div>
    );
};

// // Example usage component
// const SearchSummaryExample = () => {
//     return (
//         <SearchSummary
//             title="Real Estate & Property for auction in Mawson Lakes, SA 5095 and other locations"
//             totalProperties={51}
//             currentPage={1}
//             pageSize={25}
//         />
//     );
// };

// export default SearchSummaryExample;