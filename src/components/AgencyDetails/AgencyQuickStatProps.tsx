import React from "react";

interface QuickStatProps {
    icon: React.ComponentType<{ className?: string }>;
    value: number;
    label: string;
}

export default function AgencyQuickStat({
    icon: Icon,
    value,
    label
}: QuickStatProps)  {
    return (
        <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-gray-600" />
            <div>
                <div className="text-sm font-bold text-gray-600">
                    {value}
                </div>
                <div className="text-xs text-gray-600">
                    {label}
                </div>
            </div>
        </div>
    );
};