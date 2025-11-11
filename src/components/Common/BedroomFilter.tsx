import React from "react";

interface BedroomFilterProp {
    bedroomRange: [number, number];
    maxBedrooms: number;
    onBedroomRangeChange: (range: [number, number]) => void;
}

export default function BedroomFilter({
   bedroomRange,
   maxBedrooms,
   onBedroomRangeChange
}: BedroomFilterProp) {
    const handleBedroomClick = (bedNum: number) => {
        const isSelected = bedNum >= bedroomRange[0] && bedNum <= bedroomRange[1];

        if (isSelected) {
            if (bedNum === bedroomRange[0]) {
                onBedroomRangeChange([bedNum + 1, bedroomRange[1]]);
            } else if (bedNum === bedroomRange[1]) {
                onBedroomRangeChange([bedroomRange[0], bedNum - 1]);
            }
        } else {
            if (bedNum < bedroomRange[0]) {
                onBedroomRangeChange([bedNum, bedroomRange[1]]);
            } else {
                onBedroomRangeChange([bedroomRange[0], bedNum]);
            }
        }
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
                Bedrooms
            </label>
            <div className="flex flex-wrap gap-2">
                {[...Array(maxBedrooms)].map((_, i) => {
                    const bedNum = i + 1;
                    const isSelected = bedNum >= bedroomRange[0] && bedNum <= bedroomRange[1];
                    return (
                        <button
                            key={bedNum}
                            onClick={() => handleBedroomClick(bedNum)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isSelected
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {bedNum}
                        </button>
                    );
                })}
                <button
                    onClick={() => onBedroomRangeChange([maxBedrooms, maxBedrooms])}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        bedroomRange[0] === maxBedrooms && bedroomRange[1] === maxBedrooms
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {maxBedrooms}+
                </button>
            </div>
        </div>
    );
}
