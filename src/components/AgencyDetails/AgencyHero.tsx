import React from 'react';

export interface AgencyHeroProps {
    heroImage?: string;
    agencyLogo?: string;
    backgroundColor?: string;
}

export default function AgencyHero({
   heroImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=600&fit=crop',
   agencyLogo,
   backgroundColor = '#1a1a2e'
}: AgencyHeroProps)  {
    return (
        <div className="w-full">
            {/* Hero Image Section */}
            <div className="w-full h-96 relative overflow-hidden">
                <img
                    src={heroImage}
                    alt="Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
            </div>

            {/* Agency Brand Bar */}
            <div
                className={`w-full ${agencyLogo ? 'py-6' : 'py-3'} px-8 shadow-md`}
                style={{ backgroundColor }}
            >
                {agencyLogo && (
                    <div className="max-w-7xl mx-auto">
                        <img
                            src={agencyLogo}
                            alt="Agency Logo"
                            className="h-12 object-contain"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
