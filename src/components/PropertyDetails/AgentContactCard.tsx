import { Star } from 'lucide-react';

const AgentContactCard = () => {
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-white text-base font-bold">Harcourts</h2>
                    <span className="text-blue-300 text-base font-light">Adelaide City</span>
                </div>
            </div>

            {/* Agent Info */}
            <div className="p-2 border-b border-gray-200">
                <div className="flex items-start gap-4">
                    <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
                        alt="Agent profile"
                        className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <h3 className="text-base font-bold text-blue-700 mb-2">William Fan</h3>
                        <div className="flex items-center gap-2 mb-3">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">
                                <span className="font-semibold">5.0</span>
                                <span className="text-gray-600"> (106 reviews)</span>
                            </span>
                        </div>
                        <button className="px-2 py-0 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                            04118268...
                        </button>
                    </div>
                </div>
            </div>

            {/* Office Address */}
            <div className="p-2 border-b border-gray-200">
                <h4 className="text-base font-bold text-blue-700 mb-3">
                    Harcourts - Adelaide City
                </h4>
                <p className="text-sm text-gray-700">
                    Level 1/ 137 Gouger Street, ADELAIDE, SA 5000
                </p>
            </div>

            {/* Action Buttons */}
            <div className="p-3 space-y-1">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-3 rounded-lg transition-colors">
                    Get in touch
                </button>
                <button className="w-full border-1 border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold text-sm py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Star className="w-4 h-4" />
                    Save property
                </button>
            </div>
        </div>
    );
};

export default AgentContactCard;