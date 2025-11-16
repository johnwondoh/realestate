"use client";

import { Star, Phone } from 'lucide-react';

export interface AgentContactCardProps {
    agentId: string | number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    photoUrl: string;
    propertyAddress: string;
    agencyName: string;
    agencyCity: string;
    agencyColor: string;
    rating?: number;
    reviewCount?: number;
}

export default function AgentContactCard({
                                             agentId,
                                             firstName,
                                             lastName,
                                             phoneNumber,
                                             photoUrl,
                                             propertyAddress,
                                             agencyName,
                                             agencyCity,
                                             agencyColor,
                                             rating = 5.0,
                                             reviewCount = 106,
                                         }: AgentContactCardProps) {
    const handleCall = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    agencyColor = agencyColor || "#6b6e6c"

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header with Agency Color */}
            <div
                className="px-6 py-4"
                style={{
                    background: `linear-gradient(to right, ${agencyColor}, ${agencyColor}dd)`
                }}
            >
                <div className="flex items-center gap-2">
                    <h2 className="text-white text-base font-bold">{agencyName}</h2>
                    <span className="text-white text-base font-light opacity-90">{agencyCity}</span>
                </div>
            </div>

            {/* Agent Info */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-start gap-4">
                    <img
                        src={photoUrl}
                        alt={`${firstName} ${lastName}`}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div className="flex-1">
                        <h3 className="text-base font-bold text-gray-800 mb-2">
                            {firstName} {lastName}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">
                                <span className="font-semibold text-gray-800">{rating.toFixed(1)}</span>
                                <span className="text-gray-600"> ({reviewCount} reviews)</span>
                            </span>
                        </div>
                        <button
                            onClick={handleCall}
                            className="px-4 py-1 border-1 text-xs border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center gap-2"
                        >
                            <Phone className="w-4 h-4" />
                            {phoneNumber}
                        </button>
                    </div>
                </div>
            </div>

            {/* Office Address */}
            <div className="p-4 border-b border-gray-200">
                <h4
                    className="text-base font-bold mb-2"
                    style={{ color: agencyColor }}
                >
                    {agencyName} | {agencyCity}
                </h4>
                <p className="text-sm text-gray-700">
                    {propertyAddress}
                </p>
            </div>

            {/* Action Buttons */}
            <div className="p-4 space-y-2">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-3 rounded-lg transition-colors shadow-sm">
                    Get in touch
                </button>
                <button className="w-full border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-800 font-semibold text-sm py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Star className="w-4 h-4" />
                    Save property
                </button>
            </div>
        </div>
    );
}

// // Example usage with test data
// function App() {
//     return (
//         <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
//             <div>
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">Example 1: Blue Agency</h2>
//                 <AgentContactCard
//                     agentId={1}
//                     firstName="Sarah"
//                     lastName="Johnson"
//                     phoneNumber="0412 345 678"
//                     photoUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
//                     propertyAddress="123 Main Street, Adelaide, SA 5000"
//                     agencyName="Premium Real Estate"
//                     agencyCity="Adelaide"
//                     agencyColor="#1e40af"
//                     rating={4.9}
//                     reviewCount={156}
//                 />
//             </div>
//
//             <div>
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">Example 2: Green Agency</h2>
//                 <AgentContactCard
//                     agentId={2}
//                     firstName="Michael"
//                     lastName="Chen"
//                     phoneNumber="0423 456 789"
//                     photoUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
//                     propertyAddress="456 Garden Terrace, Mawson Lakes, SA 5095"
//                     agencyName="EcoHome Realty"
//                     agencyCity="Mawson Lakes"
//                     agencyColor="#059669"
//                     rating={5.0}
//                     reviewCount={203}
//                 />
//             </div>
//
//             <div>
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">Example 3: Purple Agency</h2>
//                 <AgentContactCard
//                     agentId={3}
//                     firstName="Emma"
//                     lastName="Williams"
//                     phoneNumber="0434 567 890"
//                     photoUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
//                     propertyAddress="789 Beach Road, Glenelg, SA 5045"
//                     agencyName="Coastal Properties"
//                     agencyCity="Glenelg"
//                     agencyColor="#7c3aed"
//                     rating={4.8}
//                     reviewCount={89}
//                 />
//             </div>
//
//             <div>
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">Example 4: Red Agency</h2>
//                 <AgentContactCard
//                     agentId={4}
//                     firstName="David"
//                     lastName="Martinez"
//                     phoneNumber="0445 678 901"
//                     photoUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
//                     propertyAddress="321 Hill Street, North Adelaide, SA 5006"
//                     agencyName="Prime Estates"
//                     agencyCity="North Adelaide"
//                     agencyColor="#dc2626"
//                     rating={4.7}
//                     reviewCount={127}
//                 />
//             </div>
//
//             <div>
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">Example 5: Teal Agency</h2>
//                 <AgentContactCard
//                     agentId={5}
//                     firstName="Lisa"
//                     lastName="Thompson"
//                     phoneNumber="0456 789 012"
//                     photoUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
//                     propertyAddress="555 Port Road, West Lakes, SA 5021"
//                     agencyName="Harbor View Realty"
//                     agencyCity="West Lakes"
//                     agencyColor="#0891b2"
//                     rating={4.9}
//                     reviewCount={174}
//                 />
//             </div>
//         </div>
//     );
// }
//
// export default App;

// import { Star } from 'lucide-react';
// import {backgroundLogCompilationEvents} from "next/dist/shared/lib/turbopack/compilation-events";
//
// export interface AgentContactCardProps {
//     agentId: string | number;
//     firstName: string;
//     lastName: string;
//     phoneNumber: string;
//     photoUrl: string;
//     propertyAddress: string;
//     agencyName: string;
//     agencyCity: string;
//     agencyColor: string;
// }
//
// export default function AgentContactCard({
//     agentId,
//     firstName,
//     lastName,
//     phoneNumber,
//     photoUrl,
//     propertyAddress,
//     agencyName,
//     agencyCity,
//     agencyColor,
// }: AgentContactCardProps) {
//     return (
//         <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//             {/* Header */}
//             {/*<div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4">*/}
//             <div className={"bg-gradient-to-r px-6 py-4"} add background color here>
//                 <div className="flex items-center gap-2">
//                     <h2 className="text-white text-base font-bold">{agencyName}</h2>
//                     <span className="text-blue-300 text-base font-light">{agencyCity}</span>
//                 </div>
//             </div>
//
//             {/* Agent Info */}
//             <div className="p-2 border-b border-gray-200">
//                 <div className="flex items-start gap-4">
//                     <img
//                         // src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
//                         src={photoUrl}
//                         alt="Agent profile"
//                         className="w-14 h-14 rounded-full object-cover"
//                     />
//                     <div className="flex-1">
//                         <h3 className="text-base font-bold text-gray-700 mb-2">{firstName} {lastName}</h3>
//                         <div className="flex items-center gap-2 mb-3">
//                             <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//                             <span className="text-sm">
//                                 <span className="font-semibold">5.0</span>
//                                 <span className="text-gray-600"> (106 reviews)</span>
//                             </span>
//                         </div>
//                         <button className="px-2 py-0 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
//                             {phoneNumber.slice(0, 8)}...
//                         </button>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Office Address */}
//             <div className="p-2 border-b border-gray-200">
//                 <h4 className="text-base font-bold text-blue-700 mb-3">
//                     {agencyName} | {agencyCity}
//                 </h4>
//                 <p className="text-sm text-gray-700">
//                     {propertyAddress}
//                 </p>
//             </div>
//
//             {/* Action Buttons */}
//             <div className="p-3 space-y-1">
//                 <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-3 rounded-lg transition-colors">
//                     Get in touch
//                 </button>
//                 <button className="w-full border-1 border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold text-sm py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
//                     <Star className="w-4 h-4" />
//                     Save property
//                 </button>
//             </div>
//         </div>
//     );
// };
//
