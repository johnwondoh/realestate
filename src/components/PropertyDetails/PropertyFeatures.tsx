import { Home, Droplets, Bath } from 'lucide-react';



const PropertyFeatures = () => {
    const features = [
        { icon: Home, label: 'Building size', value: '95m²' },
        { icon: Droplets, label: 'Ensuites', value: '1' },
        { icon: Bath, label: 'Toilets', value: '2' },
    ];

    return (
        <div className="max-w-4xl mx-auto p-2 bg-white">
            <h4 className="text-lg font-bold text-gray-800 mb-5">
                Property features
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div key={index} className="flex items-center gap-4">
                            <Icon className="w-6 h-6 text-gray-700 flex-shrink-0" strokeWidth={1.5} />
                            <span className="text-sm text-gray-800">
                                <span className="font-normal">{feature.label}: </span>
                                <span className="font-semibold">{feature.value}</span>
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PropertyFeatures;