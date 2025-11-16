"use client";

import { Navigation2 } from 'lucide-react';

export interface PropertyMapProps {
    address?: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    showDirections?: boolean;
}

const PropertyMap = ({
                         address = "210/42-48 Garden Terrace, Mawson Lakes, SA 5095",
                         latitude = -34.76999724114009,
                         longitude = 138.5991863123427,
                         zoom = 15,
                         showDirections = true
                     }: PropertyMapProps) => {
    const handleDirections = () => {
        const encodedAddress = encodeURIComponent(address);
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
    };

    return (
        <div className="max-w-6xl mx-auto p-3">
            <div className="relative w-full h-96 md:h-[300px] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                {/* Google Maps with location pin */}
                <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property Location Map"
                />

                {/* Directions Button */}
                {showDirections && (
                    <button
                        onClick={handleDirections}
                        className="absolute top-4 right-4 bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow font-semibold text-gray-800 flex items-center gap-2 z-20"
                    >
                        <Navigation2 className="w-5 h-5 text-blue-600" />
                        Directions
                    </button>
                )}
            </div>
        </div>
    );
};

export default PropertyMap;

// Example usage
// 'use client'
//
// import { Navigation2 } from 'lucide-react';
//
// const PropertyMap = () => {
//     const propertyAddress = "210/42-48 Garden Terrace, Mawson Lakes, SA 5095";
//     // const latitude = -34.8067;
//     // const longitude = 138.6089;
//     const latitude = -34.76999724114009;
//     const longitude = 138.5991863123427;
//
//     const handleDirections = () => {
//         const address = encodeURIComponent(propertyAddress);
//         window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
//     };
//
//     return (
//         <div className="max-w-6xl mx-auto p-3">
//             <div className="relative w-full h-96 md:h-[300px] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
//                 {/* Google Maps with location pin */}
//                 <iframe
//                     className="absolute inset-0 w-full h-full"
//                     src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
//                     style={{ border: 0 }}
//                     allowFullScreen
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                     title="Property Location Map"
//                 />
//
//                 {/* Directions Button */}
//                 <button
//                     onClick={handleDirections}
//                     className="absolute top-4 right-4 bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow font-semibold text-gray-800 flex items-center gap-2 z-20"
//                 >
//                     <Navigation2 className="w-5 h-5 text-blue-600" />
//                     Directions
//                 </button>
//             </div>
//
//             {/* Address info below map */}
//             {/*<div className="mt-4 p-4 bg-gray-50 rounded-lg">*/}
//             {/*    <p className="text-gray-700 font-medium text-center">{propertyAddress}</p>*/}
//             {/*</div>*/}
//         </div>
//     );
// };
//
// export default PropertyMap;
//
