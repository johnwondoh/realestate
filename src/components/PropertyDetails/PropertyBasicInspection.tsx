import { Calendar } from 'lucide-react';

const PropertyBasicInspection = () => {
    return (
        <div className="max-w-4xl mx-auto p-3">
            {/*<div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">*/}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
                {/* Calendar Icon */}
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-gray-800" strokeWidth={2} />
                </div>

                {/* Heading */}
                <h4 className="text-lg font-bold text-gray-900 mb-1">
                    No upcoming inspections
                </h4>

                {/* Description */}
                <p className="text-base text-gray-600 mb-6">
                    Reach out to the agent to request an inspection for 3 Market Lane.
                </p>

                {/* Button */}
                <button className="bg-gray-700 hover:bg-gray-900 text-white font-semibold text-base px-8 py-2 rounded-xl transition-colors">
                    Request an inspection
                </button>
            </div>
        </div>
    );
};

export default PropertyBasicInspection;