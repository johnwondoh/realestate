import React from "react";

interface AgencyWorkerStatProps {
    value: string | number;
    label: string;
    fullWidth?: boolean;
}

export default function AgencyWorkerStat({
    value,
    label,
    fullWidth = false
}: AgencyWorkerStatProps){
    return (
        <div className={fullWidth ? 'col-span-2' : ''}>
            <div className="text-sm font-bold text-gray-600 pb-2">
                {value}
            </div>
            <div className="text-xs text-gray-500">
                {label}
            </div>
        </div>
    );
};

