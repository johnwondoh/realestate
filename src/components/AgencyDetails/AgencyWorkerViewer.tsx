import React, { useState } from 'react';
import { Mail, Phone, Star, User } from 'lucide-react';

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

const AgencyWorkerCard: React.FC<AgencyWorkerCardProps> = ({
                                                               name,
                                                               role,
                                                               image,
                                                               email,
                                                               phoneNumber,
                                                               stats,
                                                               agencyColor = '#003366'
                                                           }) => {
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
            <div className="p-8">
                {/* Image and Name Section */}
                <div className="flex items-start gap-6 mb-6">
                    {/* Profile Image or Placeholder */}
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

                    {/* Name, Role, and Rating */}
                    <div className="flex-1 pt-2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {name}
                        </h2>
                        <p className="text-xl text-gray-600 mb-3">
                            {role}
                        </p>

                        {/* Rating */}
                        {hasRating && (
                            <div className="flex items-center gap-2">
                                <Star className="w-6 h-6 fill-yellow-400 stroke-yellow-400" />
                                <span className="text-lg font-semibold text-gray-900">
                  {stats.rating}
                </span>
                                <span className="text-gray-500">
                  ({stats.reviewCount} {stats.reviewCount === 1 ? 'review' : 'reviews'})
                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Section */}
                {hasStats ? (
                    <div className="grid grid-cols-2 gap-6 mb-6 py-6 border-y border-gray-200">
                        {stats.forRent !== undefined && (
                            <div>
                                <div className="text-4xl font-bold text-gray-900">
                                    {stats.forRent}
                                </div>
                                <div className="text-gray-600 mt-1">
                                    For rent
                                </div>
                            </div>
                        )}
                        {stats.leased !== undefined && (
                            <div>
                                <div className="text-4xl font-bold text-gray-900">
                                    {stats.leased}
                                </div>
                                <div className="text-gray-600 mt-1">
                                    Leased
                                </div>
                            </div>
                        )}
                        {stats.forSale !== undefined && (
                            <div>
                                <div className="text-4xl font-bold text-gray-900">
                                    {stats.forSale}
                                </div>
                                <div className="text-gray-600 mt-1">
                                    For sale
                                </div>
                            </div>
                        )}
                        {stats.sold !== undefined && (
                            <div>
                                <div className="text-4xl font-bold text-gray-900">
                                    {stats.sold}
                                </div>
                                <div className="text-gray-600 mt-1">
                                    Properties sold
                                </div>
                            </div>
                        )}
                        {stats.medianSalePrice && (
                            <div className="col-span-2">
                                <div className="text-4xl font-bold text-gray-900">
                                    {stats.medianSalePrice}
                                </div>
                                <div className="text-gray-600 mt-1">
                                    Median sale price
                                </div>
                            </div>
                        )}
                        {stats.medianLeasedPrice && (
                            <div className="col-span-2">
                                <div className="text-4xl font-bold text-gray-900">
                                    {stats.medianLeasedPrice}
                                </div>
                                <div className="text-gray-600 mt-1">
                                    Median leased price per week
                                </div>
                            </div>
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
                                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-800 text-gray-800 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                                Email
                            </button>
                        )}
                        {phoneNumber && (
                            <button
                                onClick={handleCall}
                                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-800 text-gray-800 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                                Call
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export interface AgencyWorkerViewerProps {
    workers: AgencyWorkerCardProps[];
    agencyName?: string;
    agencyLocation?: string;
    agencyColor?: string;
    initialDisplayCount?: number;
    loadMoreCount?: number;
}

const AgencyWorkerViewer: React.FC<AgencyWorkerViewerProps> = ({
                                                                   workers,
                                                                   agencyName,
                                                                   agencyLocation,
                                                                   agencyColor = '#003366',
                                                                   initialDisplayCount = 6,
                                                                   loadMoreCount = 10
                                                               }) => {
    const [displayCount, setDisplayCount] = useState(initialDisplayCount);

    const visibleWorkers = workers.slice(0, displayCount);
    const remainingCount = workers.length - displayCount;
    const hasMore = remainingCount > 0;

    const handleLoadMore = () => {
        setDisplayCount(prev => Math.min(prev + loadMoreCount, workers.length));
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    About the team
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                    Showing {visibleWorkers.length} of {workers.length} team members
                    {agencyName && ` from ${agencyName}`}
                    {agencyLocation && ` ${agencyLocation}`} and their key performance over the last 12 months. ^
                </p>
            </div>

            {/* Workers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {visibleWorkers.map((worker, index) => (
                    <AgencyWorkerCard
                        key={index}
                        {...worker}
                        agencyColor={agencyColor}
                    />
                ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
                <div className="flex justify-center">
                    <button
                        onClick={handleLoadMore}
                        className="px-8 py-4 bg-white border-2 border-gray-800 text-gray-800 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
                    >
                        Show {Math.min(remainingCount, loadMoreCount)} more
                    </button>
                </div>
            )}
        </div>
    );
};

// Demo component
const Demo = () => {
    const workers: AgencyWorkerCardProps[] = [
        {
            name: 'Michael Nitschke',
            role: 'Managing Director',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
            email: 'michael@nitschke.com.au',
            phoneNumber: '+61 8 1234 5680',
            stats: {
                sold: 17,
                medianSalePrice: '$779k',
                rating: 4.9,
                reviewCount: 84
            },
            agencyColor: '#1a1a2e'
        },
        {
            name: 'Ayden Lloyd',
            role: 'Property Consultant',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
            email: 'ayden@nitschke.com.au',
            phoneNumber: '+61 8 1234 5681',
            stats: {
                sold: 20,
                medianSalePrice: '$773k',
                rating: 5.0,
                reviewCount: 39
            },
            agencyColor: '#1a1a2e'
        },
        {
            name: 'Claire Ritchie',
            role: 'Property Consultant',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
            email: 'claire@nitschke.com.au',
            phoneNumber: '+61 8 1234 5682',
            stats: {
                sold: 4,
                medianSalePrice: '$650k',
                rating: 4.8,
                reviewCount: 25
            },
            agencyColor: '#1a1a2e'
        },
        {
            name: 'Daniel Nuske-Haines',
            role: 'Property Consultant',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
            email: 'daniel@nitschke.com.au',
            phoneNumber: '+61 8 1234 5683',
            stats: {
                sold: 38,
                medianSalePrice: '$744k',
                rating: 5.0,
                reviewCount: 30
            },
            agencyColor: '#1a1a2e'
        },
        {
            name: 'James Kemp',
            role: 'Property Consultant',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
            email: 'james@nitschke.com.au',
            phoneNumber: '+61 8 1234 5684',
            stats: {
                sold: 35,
                medianSalePrice: '$750k',
                rating: 5.0,
                reviewCount: 36
            },
            agencyColor: '#1a1a2e'
        },
        {
            name: 'Blythe Stafford',
            role: 'Field Services',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
            email: 'blythe@nitschke.com.au',
            phoneNumber: '+61 8 1234 5685',
            stats: {
                leased: 3,
                medianLeasedPrice: '$600'
            },
            agencyColor: '#1a1a2e'
        },
        {
            name: 'Sarah Mitchell',
            role: 'Sales Agent',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
            email: 'sarah@nitschke.com.au',
            phoneNumber: '+61 8 1234 5686',
            stats: {
                sold: 28,
                medianSalePrice: '$820k',
                rating: 4.9,
                reviewCount: 52
            },
            agencyColor: '#1a1a2e'
        },
        {
            name: 'Tom Harrison',
            role: 'Property Manager',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
            email: 'tom@nitschke.com.au',
            phoneNumber: '+61 8 1234 5687',
            stats: {
                forRent: 5,
                leased: 15
            },
            agencyColor: '#1a1a2e'
        },
        {
            name: 'Emma Wilson',
            role: 'Sales Consultant',
            image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
            email: 'emma@nitschke.com.au',
            phoneNumber: '+61 8 1234 5688',
            stats: {
                sold: 22,
                medianSalePrice: '$695k',
                rating: 4.7,
                reviewCount: 41
            },
            agencyColor: '#1a1a2e'
        },
        {
            name: 'Jack Thompson',
            role: 'Property Consultant',
            image: 'https://images.unsplash.com/photo-1558203728-00f45181dd84?w=400&h=400&fit=crop',
            email: 'jack@nitschke.com.au',
            phoneNumber: '+61 8 1234 5689',
            stats: {
                sold: 31,
                medianSalePrice: '$788k',
                rating: 4.9,
                reviewCount: 67
            },
            agencyColor: '#1a1a2e'
        },
        {
            name: 'Sophie Anderson',
            role: 'Sales Agent',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
            email: 'sophie@nitschke.com.au',
            phoneNumber: '+61 8 1234 5690',
            stats: {
                sold: 19,
                medianSalePrice: '$712k',
                rating: 5.0,
                reviewCount: 28
            },
            agencyColor: '#1a1a2e'
        },
        {
            name: 'Oliver Brown',
            role: 'Property Manager',
            image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop',
            email: 'oliver@nitschke.com.au',
            phoneNumber: '+61 8 1234 5691',
            stats: {
                forRent: 8,
                leased: 22
            },
            agencyColor: '#1a1a2e'
        },
        {
            name: 'Lucy Davis',
            role: 'Sales Consultant',
            image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
            email: 'lucy@nitschke.com.au',
            phoneNumber: '+61 8 1234 5692',
            stats: {
                sold: 26,
                medianSalePrice: '$755k',
                rating: 4.8,
                reviewCount: 45
            },
            agencyColor: '#1a1a2e'
        },
        {
            name: 'Mason Taylor',
            role: 'Property Consultant',
            image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop',
            email: 'mason@nitschke.com.au',
            phoneNumber: '+61 8 1234 5693',
            stats: {
                sold: 33,
                medianSalePrice: '$798k',
                rating: 4.9,
                reviewCount: 71
            },
            agencyColor: '#1a1a2e'
        },
        {
            name: 'Isla Martin',
            role: 'Field Services',
            image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop',
            email: 'isla@nitschke.com.au',
            phoneNumber: '+61 8 1234 5694',
            stats: {
                leased: 7,
                medianLeasedPrice: '$580'
            },
            agencyColor: '#1a1a2e'
        },
        {
            name: 'Noah White',
            role: 'Sales Agent',
            image: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=400&h=400&fit=crop',
            email: 'noah@nitschke.com.au',
            phoneNumber: '+61 8 1234 5695',
            stats: {
                sold: 29,
                medianSalePrice: '$765k',
                rating: 5.0,
                reviewCount: 58
            },
            agencyColor: '#1a1a2e'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <AgencyWorkerViewer
                workers={workers}
                agencyName="Nitschke Real Estate"
                agencyLocation="RLA 193520 - MOUNT BARKER"
                agencyColor="#1a1a2e"
                initialDisplayCount={6}
                loadMoreCount={10}
            />
        </div>
    );
};

export default Demo;