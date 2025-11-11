import React from 'react';
import { DollarSign, Clock, Home, Users } from 'lucide-react';

import AgencyMetricStatCard from './AgencyMetricStatCard';
import {AgencyMetricStatCardProps} from "./AgencyMetricStatCard";

export interface AgencyMetricsProps {
    salesMetrics: AgencyMetricStatCardProps[];
    rentalMetrics: AgencyMetricStatCardProps[];
}

export default function AgencyMetrics({
     salesMetrics,
     rentalMetrics
 }: AgencyMetricsProps)  {
    return (
        <div className="w-full max-w-7xl mx-auto p-3 space-y-8">
            {/* Sales Performance */}
            {salesMetrics.length > 0 && (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {salesMetrics.map((metric, index) => (
                            <AgencyMetricStatCard key={index} {...metric} />
                        ))}
                    </div>
                </div>
            )}

            {/* Rent Performance */}
            {rentalMetrics.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
                        Rent Performance
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {rentalMetrics.map((metric, index) => (
                            <AgencyMetricStatCard key={index} {...metric} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Demo component
// const Demo = () => {
//     const salesMetrics: AgencyMetricStatCardProps[] = [
//         {
//             icon: 'dollar',
//             value: '$750k',
//             label: 'Median sold price'
//         },
//         {
//             icon: 'clock',
//             value: '28.5',
//             label: 'Median days advertised'
//         },
//         {
//             icon: 'sold',
//             value: '114',
//             label: 'Properties sold'
//         },
//         {
//             icon: 'home',
//             value: '14',
//             label: 'Properties for sale'
//         }
//     ];
//
//     const rentalMetrics: AgencyMetricStatCardProps[] = [
//         {
//             icon: 'dollar',
//             value: '$590pw',
//             label: 'Median leased price'
//         },
//         {
//             icon: 'clock',
//             value: '20',
//             label: 'Median days advertised'
//         },
//         {
//             icon: 'home',
//             value: '35',
//             label: 'Properties leased'
//         },
//         {
//             icon: 'people',
//             value: '7',
//             label: 'Properties for rent'
//         }
//     ];
//
//     return (
//         <div className="min-h-screen bg-gray-50 py-12">
//             <AgencyMetrics
//                 salesMetrics={salesMetrics}
//                 rentalMetrics={rentalMetrics}
//             />
//         </div>
//     );
// };

// export default Demo;