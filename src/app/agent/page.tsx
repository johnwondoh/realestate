"use client";

import React, {useState} from 'react';
import Navbar from "@/components/Navbar";
import {PropertyCardProps} from "@/components/Common/MiniPropertyCard";
import About from "@/components/Common/About";
import AgentHeaderCard from "@/components/Agent/AgentHeaderCard";
import Footer from "@/components/Footer";
// import {PropertyStatus, SortOption} from "@/components/Common/PropertySubView";
import PropertySubView from "@/components/Common/PropertySubView";
import AgentContactCard from "@/components/Common/AgentContactCard";



// const agentProperties: PropertyCardProps[] = [
//     {
//         image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
//         price: '$730,000 - $760,000',
//         address: '7 Ashfield Street',
//         suburb: 'Mount Barker',
//         state: 'SA',
//         postcode: '5251',
//         propertyType: 'House',
//         bedrooms: 3,
//         bathrooms: 2,
//         parking: 2
//     },
//     {
//         image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
//         price: '$740,000 - $780,000',
//         address: '101 Princes Highway',
//         suburb: 'Littlehampton',
//         state: 'SA',
//         propertyType: 'House',
//         bedrooms: 3,
//         bathrooms: 1,
//         parking: 3
//     },
//     {
//         image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
//         price: '$520,000 - $550,000',
//         address: '25 Garden Avenue',
//         suburb: 'Adelaide',
//         state: 'SA',
//         postcode: '5000',
//         propertyType: 'Apartment',
//         bedrooms: 2,
//         bathrooms: 2,
//         parking: 1
//     },
//     {
//         image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
//         price: '$895,000',
//         address: '42 Coastal Drive',
//         suburb: 'Glenelg',
//         state: 'SA',
//         postcode: '5045',
//         propertyType: 'Villa',
//         bedrooms: 4,
//         bathrooms: 2,
//         parking: 2
//     },
//     {
//         image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
//         price: '$650,000',
//         address: '88 Beach Road',
//         suburb: 'Henley Beach',
//         state: 'SA',
//         postcode: '5022',
//         propertyType: 'Townhouse',
//         bedrooms: 3,
//         bathrooms: 2,
//         parking: 2
//     }
// ]

const agentProperties: PropertyCardProps[] = [
    {
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
        price: '$850,000',
        address: '123 Ocean View Drive',
        suburb: 'Brighton',
        state: 'VIC',
        postcode: '3186',
        propertyType: 'House',
        bedrooms: 4,
        bathrooms: 2,
        parking: 2,
        createdOn: '2024-11-01',
        agencyColor: '#3b82f6',
        isFavorite: false
    },
    {
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
        price: '$650,000',
        address: '45 Park Street',
        suburb: 'St Kilda',
        state: 'VIC',
        postcode: '3182',
        propertyType: 'Apartment',
        bedrooms: 2,
        bathrooms: 2,
        parking: 1,
        createdOn: '2024-10-28',
        agencyColor: '#10b981',
        isFavorite: false
    },
    {
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
        price: '$1,200,000',
        address: '78 Riverside Avenue',
        suburb: 'South Yarra',
        state: 'VIC',
        postcode: '3141',
        propertyType: 'Townhouse',
        bedrooms: 3,
        bathrooms: 2,
        parking: 2,
        createdOn: '2024-11-03',
        agencyColor: '#f59e0b',
        isFavorite: false
    },
    {
        image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400',
        price: '$495,000',
        address: '12 Collins Street',
        suburb: 'Melbourne',
        state: 'VIC',
        postcode: '3000',
        propertyType: 'Apartment',
        bedrooms: 1,
        bathrooms: 1,
        parking: 1,
        createdOn: '2024-10-15',
        agencyColor: '#ef4444',
        isFavorite: false
    },
    {
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400',
        price: '$975,000',
        address: '56 Garden Lane',
        suburb: 'Brighton',
        state: 'VIC',
        postcode: '3186',
        propertyType: 'House',
        bedrooms: 3,
        bathrooms: 2,
        parking: 2,
        createdOn: '2024-10-20',
        agencyColor: '#8b5cf6',
        isFavorite: false
    },
    {
        image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400',
        price: '$720,000',
        address: '89 Beach Road',
        suburb: 'St Kilda',
        state: 'VIC',
        postcode: '3182',
        propertyType: 'Apartment',
        bedrooms: 2,
        bathrooms: 1,
        parking: 1,
        createdOn: '2024-11-02',
        agencyColor: '#06b6d4',
        isFavorite: false
    }
];



const shortDescription = 'Nitschke Real Estate is a family-owned agency that has been serving the Mount Barker community for over 20 years. We pride ourselves on exceptional customer service and local market expertise.';

const longDescription = 'Nitschke Real Estate is a family-owned agency that has been serving the Mount Barker community for over 20 years. We pride ourselves on exceptional customer service and local market expertise.\n\nOur team of dedicated professionals brings together decades of combined experience in residential sales, property management, and investment advice. We understand that buying or selling a property is one of the most significant decisions you will make, and we are committed to making the process as smooth and stress-free as possible.\n\nWe believe in building long-term relationships with our clients, based on trust, transparency, and results. Our deep knowledge of the local area, combined with cutting-edge marketing strategies and technology, ensures that your property receives maximum exposure to the right buyers.\n\nWhether you are a first-home buyer, seasoned investor, or looking to sell your family home, our team is here to guide you every step of the way. We take the time to understand your unique needs and goals, and we work tirelessly to exceed your expectations.\n\nAt Nitschke Real Estate, we are not just selling properties – we are helping people achieve their dreams and build their futures. That is what drives us every day, and it is why so many of our clients become lifelong friends.';


// const AgencyName = ''



export default function AgentDetailsPage(){

    // const [isOpen, setIsOpen] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [activeStatus, setActiveStatus] = useState<PropertyStatus>('for-sale');
    // const [sortBy, setSortBy] = useState<SortOption>('newest');
    // -----------------------
    // const propertiesPerPage = 9;
    // const startIndex = (currentPage - 1) * propertiesPerPage;
    // const visibleProperties = agentProperties.slice(startIndex, startIndex + propertiesPerPage);
// -----------------------


    const handleRequestAppraisal = () => {
        alert('Request appraisal clicked!');
    };

    const handleShare = () => {
        alert('Share clicked!');
    };


    return (
        <div className="page">
            <Navbar />
            {/*<AgencyHero agencyLogo={''} backgroundColor={'#1a1a2e'}/>*/}

            {/*------------------------*/}


            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <AgentHeaderCard
                        name="Jon M. Jones"
                        role="Managing Director"
                        agencyName="JMJ Real Estate RLA 193520 - MOUNT BARKER"
                        agencyLink="https://example.com/nitschke"
                        image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                        yearsExperience={17}
                        rating={4.9}
                        reviewCount={84}
                        onShare={handleShare}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                        {/* Left Column - Empty */}
                        <div className="hidden lg:block">
                            <div className="bg-blue-100 rounded-lg p-6 h-96 flex items-center justify-center border-2 border-dashed border-blue-300">
                                <span className="text-blue-600 font-semibold">Left Section (Empty)</span>
                            </div>
                        </div>

                        {/* Middle Column - Main Content */}
                        <div className="lg:col-span-4 space-y-6">
                            {/*    -------------------------------------------*/}
                            {/*<div className="min-h-screen bg-gray-50 p-8">*/}
                            {/*    <div className="max-w-7xl mx-auto space-y-8">*/}
                            <div className=" bg-gray-50 p-3">
                                <About
                                    topicName="Jon M. Jones"
                                    description={longDescription}
                                    videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                    previewLength={250}
                                    agencyColor="#1a1a2e"
                                />
                            </div>
                            <div className="min-h-screen bg-gray-50">
                                <PropertySubView agentProperties={agentProperties}/>


                            </div>








                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="lg:col-span-2">
                            <div className="bg-purple-100 rounded-lg p-2 sticky top-8">
                                {/*<div className="h-96 flex items-center justify-center border-2 border-dashed border-purple-300">*/}
                                {/*    <span className="text-purple-700 font-semibold">Sidebar (Sticky)</span>*/}

                                {/*</div>*/}
                                <AgentContactCard/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/*----------------------*/}
            <div className="page">




                {/*<Demo/>*/}
                {/*<Demo2/>*/}

            </div>
            {/*<h1>Property Details</h1>*/}
            <Footer/>
        </div>
    )
}