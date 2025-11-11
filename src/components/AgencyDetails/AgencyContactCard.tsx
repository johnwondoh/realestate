import React from 'react';
import { Mail, Phone, Star, Share2, MapPin, Users, Home } from 'lucide-react';

import AgencyContactCardActionButton from "@/components/AgencyDetails/AgencyContactCardActionButton";
import AgencyQuickStat from "@/components/AgencyDetails/AgencyQuickStatProps";

export interface AgencyContactCardProps {
    agencyName: string;
    agencyLocation?: string;
    agencyLogo?: string;
    agencyColor?: string;
    rating?: number;
    reviewCount?: number;
    phoneNumber?: string;
    email?: string;
    address?: string;
    licenseNumber?: string;
    activeListings?: number;
    teamSize?: number;
    onRequestAppraisal?: () => void;
    onEnquire?: () => void;
    onCall?: () => void;
    onShare?: () => void;
}

interface ActionButtonProps {
    onClick: () => void;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
}





export default function AgencyContactCard({
    agencyName,
    agencyLocation,
    agencyLogo,
    agencyColor = '#4a5568',
    rating,
    reviewCount,
    phoneNumber,
    email,
    address,
    licenseNumber,
    activeListings,
    teamSize,
    onRequestAppraisal,
    onEnquire,
    onCall,
    onShare
}: AgencyContactCardProps){
    const handleRequestAppraisal = () => {
        if (onRequestAppraisal) {
            onRequestAppraisal();
        }
    };

    const handleEnquire = () => {
        if (onEnquire) {
            onEnquire();
        } else if (email) {
            window.location.href = `mailto:${email}`;
        }
    };

    const handleCall = () => {
        if (onCall) {
            onCall();
        } else if (phoneNumber) {
            window.location.href = `tel:${phoneNumber}`;
        }
    };

    const handleShare = () => {
        if (onShare) {
            onShare();
        } else if (navigator.share) {
            navigator.share({
                title: agencyName,
                text: `Check out ${agencyName}`,
                url: window.location.href
            });
        }
    };

    const hasRating = rating !== undefined && reviewCount !== undefined;

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl">
            {/* Header Section */}
            <div
                className="px-8 py-6"
                style={{ backgroundColor: agencyColor }}
            >
                {agencyLogo && (
                    <div className="flex justify-center mb-4">
                        <img
                            src={agencyLogo}
                            alt={agencyName}
                            className="h-16 object-contain"
                        />
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="px-8 py-3">
                {/* Agency Name and Location */}
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                        {agencyName}
                    </h2>
                    {agencyLocation && (
                        <p className="text-sm text-gray-600">
                            {agencyLocation}
                        </p>
                    )}
                    {licenseNumber && (
                        <p className="text-xs text-gray-500 mt-1">
                            {licenseNumber}
                        </p>
                    )}
                </div>

                {/* Rating */}
                {hasRating && (
                    <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                        <span className="text-xs font-bold text-gray-900">
                            {rating}
                        </span>
                        <span className="text-xs text-gray-600">
                            ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                        </span>
                    </div>
                )}

                {/* Quick Stats */}
                {(activeListings !== undefined || teamSize !== undefined) && (
                    <div className="flex gap-6 mb-4 pb-4 border-b border-gray-200">
                        {activeListings !== undefined && (
                            <AgencyQuickStat icon={Home} value={activeListings} label="Active listings" />
                        )}
                        {teamSize !== undefined && (
                            <AgencyQuickStat icon={Users} value={teamSize} label="Team members" />
                        )}
                    </div>
                )}

                {/* Address */}
                {address && (
                    <div className="flex items-start gap-3 mb-6">
                        <MapPin className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-gray-700">
                            {address}
                        </p>
                    </div>
                )}

                {/* Primary Action Button */}
                {onRequestAppraisal && (
                    <AgencyContactCardActionButton
                        onClick={handleRequestAppraisal}
                        icon={Mail}
                        label="Request a free appraisal"
                        variant="primary"
                    />
                )}

                {/* Secondary Action Buttons */}
                <div className={`space-y-3 ${onRequestAppraisal ? 'mt-3' : ''} mb-4`}>
                    {(onEnquire || email) && (
                        <AgencyContactCardActionButton
                            onClick={handleEnquire}
                            icon={Mail}
                            label="Enquire"
                        />
                    )}
                    {(onCall || phoneNumber) && (
                        <AgencyContactCardActionButton
                            onClick={handleCall}
                            icon={Phone}
                            label="Call agency"
                        />
                    )}
                </div>

                {/* Share Button */}
                <div className="flex justify-center pt-4 border-t border-gray-200">
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                        aria-label="Share"
                    >
                        <Share2 className="w-5 h-5" />
                        <span className="font-medium">Share</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// // Demo component
// const Demo = () => {
//     const handleRequestAppraisal = () => {
//         alert('Request appraisal clicked!');
//     };
//
//     const handleShare = () => {
//         alert('Share clicked!');
//     };
//
//     return (
//         <div className="min-h-screen bg-gray-50 p-8">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//                     Agency Contact Cards
//                 </h1>
//
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                     {/* Full Example */}
//                     <AgencyContactCard
//                         agencyName="Nitschke Real Estate"
//                         agencyLocation="MOUNT BARKER"
//                         agencyLogo="https://via.placeholder.com/200x60/ffffff/1a1a2e?text=NITSCHKE"
//                         agencyColor="#4a5568"
//                         rating={4.9}
//                         reviewCount={214}
//                         phoneNumber="+61 8 1234 5678"
//                         email="info@nitschke.com.au"
//                         address="123 Main Street, Mount Barker SA 5251"
//                         licenseNumber="RLA 193520"
//                         activeListings={47}
//                         teamSize={16}
//                         onRequestAppraisal={handleRequestAppraisal}
//                         onShare={handleShare}
//                     />
//
//                     {/* Minimal Example */}
//                     <AgencyContactCard
//                         agencyName="Harcourts Adelaide City"
//                         agencyLocation="Adelaide"
//                         agencyColor="#003366"
//                         phoneNumber="+61 8 8765 4321"
//                         email="info@harcourts.com.au"
//                         activeListings={32}
//                     />
//
//                     {/* Without Logo */}
//                     <AgencyContactCard
//                         agencyName="Coastal Realty Partners"
//                         agencyLocation="Glenelg"
//                         agencyColor="#0f766e"
//                         rating={4.8}
//                         reviewCount={156}
//                         phoneNumber="+61 8 9999 8888"
//                         email="hello@coastalrealty.com.au"
//                         address="456 Beach Road, Glenelg SA 5045"
//                         teamSize={12}
//                         onRequestAppraisal={handleRequestAppraisal}
//                     />
//
//                     {/* Simple Version */}
//                     <AgencyContactCard
//                         agencyName="Premier Property Group"
//                         agencyColor="#dc2626"
//                         phoneNumber="+61 8 7777 6666"
//                         email="contact@premierpropertygroup.com.au"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Demo;