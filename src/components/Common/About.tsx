'use client'

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface AboutAgencyProps {
    topicName: string;
    description: string;
    videoUrl?: string;
    previewLength?: number;
    agencyColor?: string;
}

export default function About({
    topicName,
    description,
    videoUrl,
    previewLength = 250,
    agencyColor = '#4a5568'
}: AboutAgencyProps) {
    // const {
    //     agencyName,
    //     description,
    //     videoUrl,
    //     previewLength = 250,
    //     agencyColor = '#4a5568'
    // } = props;

    const [isExpanded, setIsExpanded] = useState(false);

    const shouldShowButton = description.length > previewLength;

    let displayText = '';
    if (isExpanded || !shouldShowButton) {
        displayText = description;
    } else {
        displayText = description.slice(0, previewLength) + '...';
    }

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl">
            <div
                className="h-1 w-20 rounded-full mb-6"
                style={{ backgroundColor: agencyColor }}
            />

            <h2 className="text-lg font-bold text-gray-900 mb-6">
                About {topicName}
            </h2>

            <div className="text-gray-700 text-base leading-tight  whitespace-pre-line mb-6">
                {displayText}
            </div>

            {shouldShowButton && (
                <div className="mb-6">
                    <button
                        onClick={toggleExpanded}
                        className="flex items-center gap-2 text-gray-800 font-semibold hover:text-gray-600 transition-colors"
                    >
                        {isExpanded ? (
                            <>
                                <span>Read less</span>
                                <ChevronUp className="w-5 h-5" />
                            </>
                        ) : (
                            <>
                                <span>Read more</span>
                                <ChevronDown className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </div>
            )}

            {videoUrl && (
                <div className="mb-6">
                    <div className="relative w-full rounded-lg overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            src={videoUrl}
                            className="absolute top-0 left-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={topicName + ' video'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

// const Demo = () => {
//
//     return (
//
//     );
// };
//
// export default Demo;

// import React, { useState } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';
//
// export interface AboutAgencyProps {
//     agencyName: string;
//     description: string;
//     previewLength?: number;
//     agencyColor?: string;
// }
//
// const About: React.FC<AboutAgencyProps> = ({
//                                                      agencyName,
//                                                      description,
//                                                      previewLength = 250,
//                                                      agencyColor = '#4a5568'
//                                                  }) => {
//     const [isExpanded, setIsExpanded] = useState(false);
//
//     const shouldShowButton = description.length > previewLength;
//     const displayText = isExpanded || !shouldShowButton
//         ? description
//         : `${description.slice(0, previewLength)}...`;
//
//     const toggleExpanded = () => {
//         setIsExpanded(!isExpanded);
//     };
//
//     return (
//         <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl">
//             {/* Agency Color Bar */}
//             <div
//                 className="h-1 w-20 rounded-full mb-6"
//                 style={{ backgroundColor: agencyColor }}
//             />
//
//             {/* Title */}
//             <h2 className="text-3xl font-bold text-gray-900 mb-6">
//                 About {agencyName}
//             </h2>
//
//             {/* Description */}
//             <div className="text-gray-700 text-lg leading-relaxed mb-6 whitespace-pre-line">
//                 {displayText}
//             </div>
//
//             {/* Read More/Less Button */}
//             {shouldShowButton && (
//                 <button
//                     onClick={toggleExpanded}
//                     className="flex items-center gap-2 text-gray-800 font-semibold hover:text-gray-600 transition-colors"
//                 >
//                     {isExpanded ? (
//                         <>
//                             <span>Read less</span>
//                             <ChevronUp className="w-5 h-5" />
//                         </>
//                     ) : (
//                         <>
//                             <span>Read more</span>
//                             <ChevronDown className="w-5 h-5" />
//                         </>
//                     )}
//                 </button>
//             )}
//         </div>
//     );
// };
//
// // Demo component
// const Demo2 = () => {
//     const shortDescription = `Nitschke Real Estate is a family-owned agency that has been serving the Mount Barker community for over 20 years. We pride ourselves on exceptional customer service and local market expertise.`;
//
//     const longDescription = `Nitschke Real Estate is a family-owned agency that has been serving the Mount Barker community for over 20 years. We pride ourselves on exceptional customer service and local market expertise.
//
// Our team of dedicated professionals brings together decades of combined experience in residential sales, property management, and investment advice. We understand that buying or selling a property is one of the most significant decisions you'll make, and we're committed to making the process as smooth and stress-free as possible.
//
// We believe in building long-term relationships with our clients, based on trust, transparency, and results. Our deep knowledge of the local area, combined with cutting-edge marketing strategies and technology, ensures that your property receives maximum exposure to the right buyers.
//
// Whether you're a first-home buyer, seasoned investor, or looking to sell your family home, our team is here to guide you every step of the way. We take the time to understand your unique needs and goals, and we work tirelessly to exceed your expectations.
//
// At Nitschke Real Estate, we're not just selling properties – we're helping people achieve their dreams and build their futures. That's what drives us every day, and it's why so many of our clients become lifelong friends.`;
//
//     return (
//         <div className="min-h-screen bg-gray-50 p-8">
//             <div className="max-w-7xl mx-auto space-y-8">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//                     About Agency Components
//                 </h1>
//
//                 {/* Long Description - Shows Read More/Less */}
//                 <div>
//                     <h3 className="text-xl font-semibold text-gray-700 mb-4">
//                         With Read More/Less Button
//                     </h3>
//                     <About
//                         agencyName="Nitschke Real Estate"
//                         description={longDescription}
//                         previewLength={250}
//                         agencyColor="#1a1a2e"
//                     />
//                 </div>
//
//                 {/* Short Description - No Button */}
//                 <div>
//                     <h3 className="text-xl font-semibold text-gray-700 mb-4">
//                         Short Description (No Button)
//                     </h3>
//                     <About
//                         agencyName="Harcourts Adelaide City"
//                         description={shortDescription}
//                         previewLength={250}
//                         agencyColor="#003366"
//                     />
//                 </div>
//
//                 {/* Different Color */}
//                 <div>
//                     <h3 className="text-xl font-semibold text-gray-700 mb-4">
//                         Custom Color
//                     </h3>
//                     <About
//                         agencyName="Coastal Realty Partners"
//                         description={longDescription}
//                         previewLength={200}
//                         agencyColor="#0f766e"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Demo2;