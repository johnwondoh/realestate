import { Home, Droplets, Bath, Wind, Check, Waves, Car, Tent, Building2 } from 'lucide-react';

export interface PropertyFeaturesProps {
    buildingSize?: number | string | null;
    toilets?: number | string | null;
    ensuites?: number | string | null;
    bathrooms?: number | string | null;
    pool?: number | string | null;
    garage?: boolean | null;
    pergola?: boolean | null;
    grannyFlat?: boolean | null;
    airConditioning?: number | string | null;
}

export default function PropertyFeatures({
     buildingSize,
     toilets,
     ensuites,
     bathrooms,
     pool,
     garage,
     pergola,
     grannyFlat,
     airConditioning
 }: PropertyFeaturesProps) {
    // Define all possible features
    const allFeatures = [
        {
            icon: Home,
            label: 'Building size',
            value: buildingSize,
            unit: 'm²',
            type: 'value' as const
        },
        {
            icon: Bath,
            label: 'Bathrooms',
            value: bathrooms,
            type: 'value' as const
        },
        {
            icon: Droplets,
            label: 'Ensuites',
            value: ensuites,
            type: 'value' as const
        },
        {
            icon: Bath,
            label: 'Toilets',
            value: toilets,
            type: 'value' as const
        },
        {
            icon: Waves,
            label: 'Pool',
            value: pool,
            type: 'value' as const
        },
        {
            icon: Wind,
            label: 'Air conditioning',
            value: airConditioning,
            type: 'value' as const
        },
        {
            icon: Car,
            label: 'Garage',
            value: garage,
            type: 'boolean' as const
        },
        {
            icon: Tent,
            label: 'Pergola',
            value: pergola,
            type: 'boolean' as const
        },
        {
            icon: Building2,
            label: 'Granny flat',
            value: grannyFlat,
            type: 'boolean' as const
        },
    ];

    // Filter out features that are not present
    const activeFeatures = allFeatures.filter(feature => {
        if (feature.type === 'boolean') {
            return feature.value === true;
        }
        return feature.value !== null && feature.value !== undefined && feature.value !== '';
    });

    // Don't render anything if no features are present
    if (activeFeatures.length === 0) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto p-2 bg-white">
            <h4 className="text-lg font-bold text-gray-800 mb-5">
                Property features
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div key={index} className="flex items-center gap-4">
                            <Icon className="w-6 h-6 text-gray-700 flex-shrink-0" strokeWidth={1.5} />
                            <span className="text-sm text-gray-800">
                                <span className="font-normal">{feature.label}: </span>
                                {feature.type === 'boolean' ? (
                                    <Check className="w-5 h-5 text-green-600 inline-block" strokeWidth={2.5} />
                                ) : (
                                    <span className="font-semibold">
                                        {feature.value}{feature.unit || ''}
                                    </span>
                                )}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
//
// // Example usage with test data
// function App() {
//     return (
//         <div className="p-8 space-y-12 bg-gray-50">
//             <div>
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">Example 1: All Features</h2>
//                 <PropertyFeatures
//                     buildingSize={250}
//                     bathrooms={2}
//                     ensuites={1}
//                     toilets={3}
//                     pool="In-ground"
//                     airConditioning="Ducted"
//                     garage={true}
//                     pergola={true}
//                     grannyFlat={true}
//                 />
//             </div>
//
//             <div>
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">Example 2: Only Value Features</h2>
//                 <PropertyFeatures
//                     buildingSize={180}
//                     bathrooms={2}
//                     ensuites={1}
//                     toilets={2}
//                     airConditioning="Split system"
//                 />
//             </div>
//
//             <div>
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">Example 3: Mixed Features</h2>
//                 <PropertyFeatures
//                     buildingSize={320}
//                     bathrooms={3}
//                     pool="Above ground"
//                     garage={true}
//                     grannyFlat={true}
//                 />
//             </div>
//
//             <div>
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">Example 4: Only Boolean Features</h2>
//                 <PropertyFeatures
//                     garage={true}
//                     pergola={true}
//                     grannyFlat={true}
//                 />
//             </div>
//
//             <div>
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">Example 5: Minimal Features</h2>
//                 <PropertyFeatures
//                     buildingSize={150}
//                     bathrooms={1}
//                     garage={true}
//                 />
//             </div>
//
//             <div>
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">Example 6: No Features (Component Hidden)</h2>
//                 <PropertyFeatures />
//                 <p className="text-gray-500 italic">No features to display - component is hidden</p>
//             </div>
//         </div>
//     );
// }
//
// export default App;

// import { Home, Droplets, Bath } from 'lucide-react';
//
// export interface PropertyFeaturesProps {
//     buildingSize?: number | string |null;
//     toilets?: number | string |null;
//     ensuites?: number | string |null;
//     bathrooms?: number | string |null;
// }
//
// export default function PropertyFeatures ({
//     buildingSize,
//     toilets,
//     ensuites,
//     bathrooms
// }: PropertyFeaturesProps)  {
//     const features = [
//         { icon: Home, label: 'Building size', value: buildingSize + 'm²' },
//         { icon: Droplets, label: 'Ensuites', value:  ensuites},
//         { icon: Bath, label: 'Toilets', value: toilets },
//     ];
//
//     return (
//         <div className="max-w-4xl mx-auto p-2 bg-white">
//             <h4 className="text-lg font-bold text-gray-800 mb-5">
//                 Property features
//             </h4>
//
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {features.map((feature, index) => {
//                     const Icon = feature.icon;
//                     return (
//                         <div key={index} className="flex items-center gap-4">
//                             <Icon className="w-6 h-6 text-gray-700 flex-shrink-0" strokeWidth={1.5} />
//                             <span className="text-sm text-gray-800">
//                                 <span className="font-normal">{feature.label}: </span>
//                                 <span className="font-semibold">{feature.value}</span>
//                             </span>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };
//
