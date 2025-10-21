import { Bed, Bath, Home, Share2, Star } from 'lucide-react';

import Image from 'next/image';

const PropertyHero = () => {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Desktop & Tablet Layout */}
            {/*<div className="hidden md:flex gap-6 p-6 bg-gray-600">*/}
            <div className="hidden md:flex gap-6 p-6 bg-light-400">
                {/* Left Side - Property Summary */}
                {/*<div className="flex-1 flex flex-col justify-between">*/}
                <div className="flex-1 flex flex-col justify-between">
                    {/* Share and Save buttons */}
                    <div className="flex gap-4 mb-6">
                        <button className="flex flex-col items-center gap-1 text-gray-700 hover:text-gray-900">
                            <Share2 className="w-6 h-6" />
                            <span className="text-sm font-medium">Share</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 text-gray-700 hover:text-gray-900">
                            <Star className="w-6 h-6" />
                            <span className="text-sm font-medium">Save</span>
                        </button>
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                        <h1 className="text-2xl md:text-2xl font-bold text-gray-900 mb-2">
                            210/42-48 Garden Terrace, Mawson Lakes, SA 5095
                        </h1>
                        {/* Property Features */}
                        <div className="flex items-center gap-6 text-gray-700 mb-8">
                            <div className="flex items-center gap-2">
                                <Bed className="w-5 h-5" />
                                <span className="text-base font-medium">2</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Bath className="w-5 h-5" />
                                <span className="text-base font-medium">2</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Home className="w-5 h-5" />
                                <span className="text-base font-medium">95m²</span>
                            </div>
                            <span className="text-base font-semibold">• Apartment</span>
                        </div>
                        {/* Price Guide */}
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                Price Guide: $479k - $510k
                            </h2>
                        </div>
                    </div>
                    <div></div>



                </div>

                {/* Right Side - Property Image */}
                {/*<div className="flex-1">*/}
                <div className="flex-[2]">

                    {/*<Image*/}
                    {/*    // src="houses/9024-Main-Image_1600x.jpg.webp"*/}
                    {/*    src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"*/}
                    {/*    alt= "Property interior"*/}
                    {/*    width={600}*/}
                    {/*    height={400}*/}
                    {/*    // className="rounded-lg"*/}
                    {/*    className="h-6"*/}
                    {/*/>*/}
                    <img
                        src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
                        // src="public/houses/9024-Main-Image_1600x.jpg.webp"
                        alt="Property interior"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden">
                {/* Property Image on top */}
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
                        alt="Property interior"
                        className="w-full h-64 object-cover"
                    />

                    {/* Photo counter overlay */}
                    {/*<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-3">*/}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-400 rounded-full px-4 py-2 shadow-lg flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Share2 className="w-5 h-5" />
                            <span className="font-semibold">23</span>
                        </div>
                        <div className="w-px h-6 bg-gray-300"></div>
                        <Home className="w-5 h-5" />
                    </div>
                </div>

                {/* Property Summary at bottom */}
                <div className="p-6">
                    {/* Address and Action buttons */}
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-3xl font-bold text-gray-900 flex-1 pr-4">
                            97 ELDER DRIVE, Mawson Lakes, SA 5095
                        </h1>
                        <div className="flex gap-4 flex-shrink-0">
                            <button className="flex flex-col items-center gap-1 text-gray-700">
                                <Share2 className="w-6 h-6" />
                                <span className="text-xs font-medium">Share</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 text-gray-700">
                                <Star className="w-6 h-6" />
                                <span className="text-xs font-medium">Save</span>
                            </button>
                        </div>
                    </div>

                    {/* Property Features */}
                    <div className="flex items-center gap-4 text-gray-700 mb-6">
                        <div className="flex items-center gap-2">
                            <Bed className="w-5 h-5" />
                            <span className="text-lg font-medium">3</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Bath className="w-5 h-5" />
                            <span className="text-lg font-medium">2</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Home className="w-5 h-5" />
                            <span className="text-lg font-medium">2</span>
                        </div>
                        <span className="text-lg">• Townhouse</span>
                    </div>

                    {/* Contact Agent */}
                    <h2 className="text-2xl font-bold text-gray-900">
                        Contact Agent
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default PropertyHero;