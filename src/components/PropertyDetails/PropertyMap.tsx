import { Navigation2 } from 'lucide-react';

const PropertyMap = () => {
    const propertyAddress = "210/42-48 Garden Terrace, Mawson Lakes, SA 5095";
    // const latitude = -34.8067;
    // const longitude = 138.6089;
    const latitude = -34.76999724114009;
    const longitude = 138.5991863123427;

    const handleDirections = () => {
        const address = encodeURIComponent(propertyAddress);
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
    };

    return (
        <div className="max-w-6xl mx-auto p-3">
            <div className="relative w-full h-96 md:h-[300px] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                {/* Google Maps with location pin */}
                <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property Location Map"
                />

                {/* Directions Button */}
                <button
                    onClick={handleDirections}
                    className="absolute top-4 right-4 bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow font-semibold text-gray-800 flex items-center gap-2 z-20"
                >
                    <Navigation2 className="w-5 h-5 text-blue-600" />
                    Directions
                </button>
            </div>

            {/* Address info below map */}
            {/*<div className="mt-4 p-4 bg-gray-50 rounded-lg">*/}
            {/*    <p className="text-gray-700 font-medium text-center">{propertyAddress}</p>*/}
            {/*</div>*/}
        </div>
    );
};

export default PropertyMap;


// import { MapPin, Navigation } from 'lucide-react';
//
// const PropertyMap = () => {
//     const propertyAddress = "210/42-48 Garden Terrace, Mawson Lakes, SA 5095";
//
//     const handleStreetView = () => {
//         // Opens Google Street View for the property
//         const address = encodeURIComponent(propertyAddress);
//         window.open(`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=-34.8067,138.6089`, '_blank');
//     };
//
//     const handleDirections = () => {
//         // Opens Google Maps directions to the property
//         const address = encodeURIComponent(propertyAddress);
//         window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
//     };
//
//     const handleMyCommutes = () => {
//         // Placeholder for commute calculation functionality
//         alert('My Commutes feature - Calculate travel times to this property from your saved locations');
//     };
//
//     return (
//         <div className="max-w-6xl mx-auto p-4">
//             <div className="relative w-full h-96 md:h-[500px] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
//                 {/* Map placeholder with street names */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
//                     <svg className="w-full h-full opacity-30" viewBox="0 0 800 600">
//                         {/* Street lines */}
//                         <line x1="100" y1="0" x2="100" y2="600" stroke="#999" strokeWidth="2" />
//                         <line x1="300" y1="0" x2="300" y2="600" stroke="#999" strokeWidth="2" />
//                         <line x1="500" y1="0" x2="500" y2="600" stroke="#999" strokeWidth="2" />
//                         <line x1="0" y1="150" x2="800" y2="150" stroke="#999" strokeWidth="2" />
//                         <line x1="0" y1="300" x2="800" y2="300" stroke="#999" strokeWidth="2" />
//                         <line x1="0" y1="450" x2="800" y2="450" stroke="#999" strokeWidth="2" />
//
//                         {/* Street labels */}
//                         <text x="20" y="50" fill="#666" fontSize="14" transform="rotate(-90 20 50)">Park Rd</text>
//                         <text x="350" y="100" fill="#666" fontSize="14">Brady St</text>
//                         <text x="120" y="250" fill="#666" fontSize="14" transform="rotate(-90 120 250)">Odgers Rd</text>
//                         <text x="280" y="350" fill="#666" fontSize="14" transform="rotate(-90 280 350)">Sophia St</text>
//                         <text x="350" y="400" fill="#666" fontSize="14">Sheedy Rd</text>
//                         <text x="520" y="320" fill="#666" fontSize="14" transform="rotate(-90 520 320)">Phineas St</text>
//                         <text x="500" y="500" fill="#666" fontSize="14" transform="rotate(-45 500 500)">Old Port Wakefield Rd</text>
//                         <text x="600" y="400" fill="#666" fontSize="14">Penfield Rd</text>
//                     </svg>
//                 </div>
//
//
//
//                 {/* My Commutes Button */}
//                 <button
//                     onClick={handleMyCommutes}
//                     className="absolute top-4 left-4 bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-2 font-semibold text-gray-800 z-20"
//                 >
//                     <Navigation className="w-5 h-5 text-blue-600" />
//                     My commutes
//                 </button>
//
//                 {/* Action Buttons */}
//                 <div className="absolute top-4 right-4 flex gap-3 z-20">
//                     <button
//                         onClick={handleStreetView}
//                         className="bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow font-semibold text-gray-800"
//                     >
//                         Street View
//                     </button>
//                     <button
//                         onClick={handleDirections}
//                         className="bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow font-semibold text-gray-800"
//                     >
//                         Directions
//                     </button>
//                 </div>
//
//                 {/* Real map embed (Google Maps) */}
//                 <iframe
//                     className="absolute inset-0 w-full h-full"
//                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.8!2d138.6089!3d-34.8067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab0c8e3e3e3e3e3%3A0x0!2sMawson%20Lakes%20SA%205095!5e0!3m2!1sen!2sau!4v1234567890"
//                     style={{ border: 0 }}
//                     allowFullScreen
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                     title="Property Location Map"
//                 />
//             </div>
//
//             {/* Address info below map */}
//             <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <p className="text-gray-700 font-medium">{propertyAddress}</p>
//             </div>
//         </div>
//     );
// };
//
// export default PropertyMap;