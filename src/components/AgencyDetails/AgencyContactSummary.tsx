import React, {JSX} from 'react';
import {MapPin, Phone, Mail} from 'lucide-react'

export interface AgencyContactSummaryProps {
    agencyName?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
}

export default function AgencyContactSummary({
   agencyName,
   address,
   phoneNumber,
   email
}: AgencyContactSummaryProps) {
    const handleCall = () => {
        if (phoneNumber) {
            window.location.href = `tel:${phoneNumber}`;
        }
    };

    const handleEmail = () => {
        if (email) {
            window.location.href = `mailto:${email}`;
        }
    };

    return (
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg">
            {/* Agency Name */}
            {agencyName && (
                <h1 className="text-lg font-bold text-gray-900 mb-1">
                    {agencyName}
                </h1>
            )}

            {/* Address */}
            {address && (
                <div className="flex items-start gap-2 mb-3 text-gray-600">
                    <MapPin className="w-5 h-5 flex-shrink-0"  />
                    <p className="text-base">{address}</p>
                </div>
            )}

            {/* Contact Buttons */}
            {(phoneNumber || email) && (
                <div className="flex gap-4 flex-wrap">
                    {phoneNumber && (
                        <button
                            onClick={handleCall}
                            className="flex items-center justify-center gap-3 px-4 py-2 bg-white border-1 border-gray-800 text-gray-800 rounded-md font-semibold text-base hover:bg-gray-50 transition-colors"
                        >
                            <Phone className="w-5 h-5 flex-shrink-0" />
                            Call
                        </button>
                    )}

                    {email && (
                        <button
                            onClick={handleEmail}
                            // className="flex items-center justify-center gap-3 px-2 py-2 bg-green-600 text-white rounded-md font-semibold text-base hover:bg-green-700 transition-colors min-w-[160px]"
                            className="flex items-center justify-center gap-3 px-4 py-2 bg-green-600 text-white rounded-md font-semibold text-base hover:bg-green-700 transition-colors"
                        >
                            <Mail className="w-5 h-5 flex-shrink-0"/>
                            Email
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

// Demo component
