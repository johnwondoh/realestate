import React from 'react';
import { Star, Share2, User, Briefcase } from 'lucide-react';

export interface AgentHeaderCardProps {
    name: string;
    role: string;
    agencyName: string;
    agencyLink?: string;
    image?: string;
    yearsExperience?: number;
    rating?: number;
    reviewCount?: number;
    onShare?: () => void;
}

export default function AgentHeaderCard({
                                            name,
                                            role,
                                            agencyName,
                                            agencyLink,
                                            image,
                                            yearsExperience,
                                            rating,
                                            reviewCount,
                                            onShare
                                        }: AgentHeaderCardProps) {
    const handleShare = () => {
        if (onShare) {
            onShare();
        } else if (navigator.share) {
            navigator.share({
                title: name,
                text: `${name} - ${role}`,
                url: window.location.href
            });
        }
    };

    const hasRating = rating !== undefined && reviewCount !== undefined;

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 max-w-4xl">
            <div className="flex items-start gap-6">
                {/* Profile Image */}
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-32 h-32 rounded-full object-cover flex-shrink-0 shadow-md"
                    />
                ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 shadow-md">
                        <User className="w-16 h-16 text-gray-400" />
                    </div>
                )}

                {/* Agent Info */}
                <div className="flex-1 min-w-0">
                    {/* Name and Share */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <h1 className="text-4xl font-bold text-gray-900">
                            {name}
                        </h1>
                        {onShare && (
                            <button
                                onClick={handleShare}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                                aria-label="Share"
                            >
                                <Share2 className="w-6 h-6 text-gray-600" />
                            </button>
                        )}
                    </div>

                    {/* Role and Agency */}
                    <div className="mb-4">
                        <p className="text-xl text-gray-700">
                            {role} at{' '}
                            {agencyLink ? (
                                <a
                                    href={agencyLink}
                                    className="text-gray-700 underline hover:text-gray-900 transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {agencyName}
                                </a>
                            ) : (
                                <span className="text-gray-700">{agencyName}</span>
                            )}
                        </p>
                    </div>

                    {/* Experience and Rating */}
                    <div className="flex flex-wrap items-center gap-6">
                        {yearsExperience !== undefined && (
                            <div className="flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-gray-600" />
                                <span className="text-lg text-gray-700">
                  {yearsExperience} years experience
                </span>
                            </div>
                        )}

                        {hasRating && (
                            <div className="flex items-center gap-2">
                                <Star className="w-6 h-6 fill-yellow-400 stroke-yellow-400" />
                                <span className="text-lg font-semibold text-gray-900">
                  {rating}
                </span>
                                <a
                                    href="#reviews"
                                    className="text-lg text-gray-700 underline hover:text-gray-900 transition-colors"
                                >
                                    ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// // Demo component
// const Demo = () => {
//     const handleShare = () => {
//         alert('Share clicked!');
//     };
//
//     return (
//         <div className="min-h-screen bg-gray-50 p-8">
//             <div className="max-w-7xl mx-auto space-y-8">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//                     Agent Header Cards
//                 </h1>
//
//                 {/* Full Example */}
//                 <AgentHeaderCard
//                     name="Michael Nitschke"
//                     role="Managing Director"
//                     agencyName="Nitschke Real Estate RLA 193520 - MOUNT BARKER"
//                     agencyLink="https://example.com/nitschke"
//                     image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
//                     yearsExperience={17}
//                     rating={4.9}
//                     reviewCount={84}
//                     onShare={handleShare}
//                 />
//
//                 {/* Without Image */}
//                 <AgentHeaderCard
//                     name="Sarah Mitchell"
//                     role="Property Consultant"
//                     agencyName="Harcourts Adelaide City"
//                     agencyLink="https://example.com/harcourts"
//                     yearsExperience={12}
//                     rating={4.8}
//                     reviewCount={56}
//                     onShare={handleShare}
//                 />
//
//                 {/* Minimal */}
//                 <AgentHeaderCard
//                     name="John Smith"
//                     role="Sales Agent"
//                     agencyName="Coastal Realty Partners"
//                     image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
//                 />
//
//                 {/* Without Agency Link */}
//                 <AgentHeaderCard
//                     name="Emma Wilson"
//                     role="Senior Sales Consultant"
//                     agencyName="Premier Property Group"
//                     image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
//                     yearsExperience={8}
//                     rating={5.0}
//                     reviewCount={42}
//                 />
//             </div>
//         </div>
//     );
// };
//
// export default Demo;