import React from 'react';
import { DollarSign, Clock, Home, Users } from 'lucide-react';

export interface AgencyMetricStatCardProps {
    icon: 'dollar' | 'clock' | 'sold' | 'home' | 'people';
    value: string;
    label: string;
}

export default function AgencyMetricStatCard({
   icon,
   value,
   label
}: AgencyMetricStatCardProps) {
    const renderIcon = () => {
        const iconClass = "w-5 h-5 stroke-2";

        switch (icon) {
            case 'dollar':
                return <DollarSign className={iconClass} />;
            case 'clock':
                return <Clock className={iconClass} />;
            case 'sold':
                return <Home className={iconClass} />
            case 'home':
                return <Home className={iconClass} />;
            case 'people':
                return <Users className={iconClass} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-l-lg border border-gray-200 p-3 flex flex-col gap-4 hover:shadow-md transition-shadow">
            <div className="text-gray-700">
                {renderIcon()}
            </div>
            <div>
                <div className="text-lg font-bold text-gray-900 mb-2">
                    {value}
                </div>
                <div className="text-gray-600 text-base leading-snug">
                    {label}
                </div>
            </div>
        </div>
    );
};
//
// export interface AgencyMetricsProps {
//     salesMetrics: AgencyMetricStatCardProps[];
//     rentalMetrics: AgencyMetricStatCardProps[];
// }
//
// const AgencyMetrics: React.FC<AgencyMetricsProps> = ({
//                                                          salesMetrics,
//                                                          rentalMetrics
//                                                      }) => {
//     return (
//         <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
//             {/* Sales Performance */}
//             {salesMetrics.length > 0 && (
//                 <div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                         {salesMetrics.map((metric, index) => (
//                             <AgencyMetricStatCard key={index} {...metric} />
//                         ))}
//                     </div>
//                 </div>
//             )}
//
//             {/* Rent Performance */}
//             {rentalMetrics.length > 0 && (
//                 <div>
//                     <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
//                         Rent Performance
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                         {rentalMetrics.map((metric, index) => (
//                             <AgencyMetricStatCard key={index} {...metric} />
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

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