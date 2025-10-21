"use client";

import React from 'react';


import {useState} from 'react';

export interface PropertyDescriptionProps {
    title: string;
    subtitle: string;
    description: string;
}

export default function PropertyDescription({
    title='Stunning Modern Apartment In The Heart Of Mawson Lakes',
    subtitle='210/42-48 GARDEN TERRACE, MAWSON LAKES',
    description
}: PropertyDescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white">
            {/*<h3 className="text-4xl font-bold text-gray-800 mb-6">*/}
            <h4 className="text-base font-medium text-dark-900 mb-2">
                {title}
            </h4>

            <h5 className="text-xs font-medium text-gray-700 mb-3">
                {subtitle}
            </h5>

            <p className="text-sm text-gray-700 mb-6">
            {/*<p className="text-body text-dark-700 mb-4">*/}
                Currently tenanted at $490/week until 22/09/2026
            </p>

            {/*<div className="text-gray-700 leading-relaxed">*/}
            <div className="text-sm text-dark-700">
                <p className="mb-4">
                    Ideally positioned in the vibrant centre of Mawson Lakes, this well-appointed
                apartment combines generous proportions, modern finishes, and everyday
                convenience. Featuring two bedrooms plus a dedicated study, two bathrooms, and an
                open-plan living area, it&#39;s perfect for professionals, downsizers, or savvy investors.
                </p>

                {isExpanded && (
                    <>
                        <p className="mb-4">
                            The spacious master bedroom includes a walk-in robe and ensuite, while the
                            second bedroom offers built-in storage. The additional study room provides
                            flexible space for a home office or nursery.
                        </p>

                        <p className="mb-4">
                            The contemporary kitchen features stainless steel appliances, stone benchtops,
                            and ample cupboard space. The light-filled living and dining area extends to a
                            private balcony, ideal for entertaining or relaxing.
                        </p>

                        <p className="mb-4">
                            Additional features include ducted reverse cycle air conditioning, secure
                            parking for two vehicles, storage cage, intercom entry, and lift access.
                            Located within walking distance to Mawson Lakes Shopping Centre, train station,
                            University of South Australia, and quality schools.
                        </p>
                    </>
                )}
            </div>

            <button
                onClick={toggleExpanded}
                className="flex items-center gap-2 text-blue-600 font-semibold text-sm mt-4 hover:text-blue-700 transition-colors"
            >
                {isExpanded ? 'Read less' : 'Read more'}
                <svg
                    className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </div>
    );
}

// export default PropertyDescription;