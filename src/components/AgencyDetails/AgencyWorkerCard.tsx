import React, { useState } from 'react';
import { Mail, Phone, Star, User } from 'lucide-react';

import AgencyWorkerStat from "@/components/AgencyDetails/AgencyWorkerStat";

export interface WorkerStats {
    forRent?: number;
    leased?: number;
    forSale?: number;
    sold?: number;
    medianSalePrice?: string;
    medianLeasedPrice?: string;
    rating?: number;
    reviewCount?: number;
}

export interface AgencyWorkerCardProps {
    name: string;
    role: string;
    image?: string;
    email?: string;
    phoneNumber?: string;
    stats?: WorkerStats;
    agencyColor?: string;
}

export default function AgencyWorkerCard({
   name,
   role,
   image,
   email,
   phoneNumber,
   stats,
   agencyColor = '#003366'
}: AgencyWorkerCardProps ){
    const handleEmail = () => {
        if (email) {
            window.location.href = `mailto:${email}`;
        }
    };

    const handleCall = () => {
        if (phoneNumber) {
            window.location.href = `tel:${phoneNumber}`;
        }
    };

    const hasStats = stats && (
        stats.forRent !== undefined ||
        stats.leased !== undefined ||
        stats.forSale !== undefined ||
        stats.sold !== undefined ||
        stats.medianSalePrice !== undefined ||
        stats.medianLeasedPrice !== undefined
    );

    const hasRating = stats?.rating !== undefined && stats?.reviewCount !== undefined;

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden max-w-2xl hover:shadow-xl transition-shadow duration-300">
            {/* Agency Color Bar */}
            <div
                className="h-3"
                style={{ backgroundColor: agencyColor }}
            />

            {/* Profile Section */}
            <div className="p-4">
                {/* Image and Name Section */}
                <div className="flex items-start gap-6 mb-3">
                    {/* Profile Image or Placeholder */}
                    {image ? (
                        <img
                            src={image}
                            alt={name}
                            className="w-16 h-16 rounded-full object-cover flex-shrink-0 shadow-md"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 shadow-md">
                            <User className="w-16 h-16 text-gray-400" />
                        </div>
                    )}

                    {/* Name, Role, and Rating */}
                    <div className="flex-1 pt-2">
                        <h2 className="text-base font-semibold text-gray-900 mb-2">
                            {name}
                        </h2>
                        <p className="text-sm text-gray-600 mb-3">
                            {role}
                        </p>

                        {/* Rating */}
                        {hasRating && (
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                                <span className="text-sm font-semibold text-gray-900">
                                  {stats.rating}
                                </span>
                                <span className="text-xs text-gray-500">
                                  ({stats.reviewCount} {stats.reviewCount === 1 ? 'review' : 'reviews'})
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Section */}
                {hasStats ? (
                    // <div className="grid grid-cols-2 gap-6 mb-4 py-6 border-y border-gray-200">
                    <div className="flex gap-6 mb-4 py-6 border-y border-gray-200">
                        {stats.forRent !== undefined && (
                            <AgencyWorkerStat value={stats.forRent} label="For rent" />
                        )}
                        {stats.leased !== undefined && (
                            <AgencyWorkerStat value={stats.leased} label="Leased" />
                        )}
                        {stats.forSale !== undefined && (
                            <AgencyWorkerStat value={stats.forSale} label="For sale" />
                        )}
                        {stats.sold !== undefined && (
                            <AgencyWorkerStat value={stats.sold} label="Properties sold" />
                        )}
                        {stats.medianSalePrice && (
                            <AgencyWorkerStat
                                value={stats.medianSalePrice}
                                label="Median sale price"
                                fullWidth
                            />
                        )}
                        {stats.medianLeasedPrice && (
                            <AgencyWorkerStat
                                value={stats.medianLeasedPrice}
                                label="Median leased price per week"
                                fullWidth
                            />
                        )}
                    </div>
                ) : (
                    <div className="mb-6 py-6 border-y border-gray-200">
                        <p className="text-gray-500 italic text-center">
                            * Sales statistics unavailable
                        </p>
                    </div>
                )}

                {/* Contact Buttons */}
                {(email || phoneNumber) && (
                    <div className="flex gap-4">
                        {email && (
                            <button
                                onClick={handleEmail}
                                className="flex-1 flex items-center justify-center gap-3 px-3 py-2 bg-white border-1 border-gray-800 text-gray-800 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                Email
                            </button>
                        )}
                        {phoneNumber && (
                            <button
                                onClick={handleCall}
                                className="flex-1 flex items-center justify-center gap-3 px-2 py-2 bg-white border-1 border-gray-800 text-gray-800 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                Call
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

