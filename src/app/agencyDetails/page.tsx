"use client";

import React from 'react';

import AgencyHero from "@/components/AgencyDetails/AgencyHero";
import Navbar from "@/components/Navbar";
import AgencyContactSummary from "@/components/AgencyDetails/AgencyContactSummary";
// import {AgencyMetricStatCard} from "@/components/AgencyDetails/AgencyMetricStatCard";
import AgencyMetrics from "@/components/AgencyDetails/AgencyMetrics";
import {AgencyMetricStatCardProps} from "@/components/AgencyDetails/AgencyMetricStatCard";
import {PropertyCardProps} from "@/components/Common/MiniPropertyCard";

import AgencyPropertyViewer from "@/components/AgencyDetails/AgencyPropertyViewer";
import {AgencyWorkerCardProps} from "@/components/AgencyDetails/AgencyWorkerCard";
import AgencyWorkerViewer from "@/components/AgencyDetails/AgencyWorkerViewer";

// import Demo from "@/components/AgencyDetails/AgencyContactCard";
// import Demo2 from "@/components/AgencyDetails/About";
import About from "@/components/Common/About";
import AgencyContactCard from "@/components/AgencyDetails/AgencyContactCard";
import Footer from "@/components/Footer";

const salesMetrics: AgencyMetricStatCardProps[] = [
    {
        icon: 'dollar',
        value: '$750k',
        label: 'Median sold price'
    },
    {
        icon: 'clock',
        value: '28.5',
        label: 'Median days advertised'
    },
    {
        icon: 'sold',
        value: '114',
        label: 'Properties sold'
    },
    {
        icon: 'home',
        value: '14',
        label: 'Properties for sale'
    }
];

const rentalMetrics: AgencyMetricStatCardProps[] = [
    {
        icon: 'dollar',
        value: '$590pw',
        label: 'Median leased price'
    },
    {
        icon: 'clock',
        value: '20',
        label: 'Median days advertised'
    },
    {
        icon: 'home',
        value: '35',
        label: 'Properties leased'
    },
    {
        icon: 'people',
        value: '7',
        label: 'Properties for rent'
    }
];

const agencyProperties: PropertyCardProps[] = [
    {
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
        price: '$730,000 - $760,000',
        address: '7 Ashfield Street',
        suburb: 'Mount Barker',
        state: 'SA',
        postcode: '5251',
        propertyType: 'House',
        bedrooms: 3,
        bathrooms: 2,
        parking: 2
    },
    {
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
        price: '$740,000 - $780,000',
        address: '101 Princes Highway',
        suburb: 'Littlehampton',
        state: 'SA',
        propertyType: 'House',
        bedrooms: 3,
        bathrooms: 1,
        parking: 3
    },
    {
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
        price: '$520,000 - $550,000',
        address: '25 Garden Avenue',
        suburb: 'Adelaide',
        state: 'SA',
        postcode: '5000',
        propertyType: 'Apartment',
        bedrooms: 2,
        bathrooms: 2,
        parking: 1
    },
    {
        image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
        price: '$895,000',
        address: '42 Coastal Drive',
        suburb: 'Glenelg',
        state: 'SA',
        postcode: '5045',
        propertyType: 'Villa',
        bedrooms: 4,
        bathrooms: 2,
        parking: 2
    },
    {
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
        price: '$650,000',
        address: '88 Beach Road',
        suburb: 'Henley Beach',
        state: 'SA',
        postcode: '5022',
        propertyType: 'Townhouse',
        bedrooms: 3,
        bathrooms: 2,
        parking: 2
    }
]

const workers: AgencyWorkerCardProps[] = [
    {
        name: 'Michael Nitschke',
        role: 'Managing Director',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        email: 'michael@nitschke.com.au',
        phoneNumber: '+61 8 1234 5680',
        stats: {
            sold: 17,
            medianSalePrice: '$779k',
            rating: 4.9,
            reviewCount: 84
        },
        agencyColor: '#1a1a2e'
    },
    {
        name: 'Ayden Lloyd',
        role: 'Property Consultant',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        email: 'ayden@nitschke.com.au',
        phoneNumber: '+61 8 1234 5681',
        stats: {
            sold: 20,
            medianSalePrice: '$773k',
            rating: 5.0,
            reviewCount: 39
        },
        agencyColor: '#1a1a2e'
    },
    {
        name: 'Claire Ritchie',
        role: 'Property Consultant',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        email: 'claire@nitschke.com.au',
        phoneNumber: '+61 8 1234 5682',
        stats: {
            sold: 4,
            medianSalePrice: '$650k',
            rating: 4.8,
            reviewCount: 25
        },
        agencyColor: '#1a1a2e'
    },
    {
        name: 'Daniel Nuske-Haines',
        role: 'Property Consultant',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        email: 'daniel@nitschke.com.au',
        phoneNumber: '+61 8 1234 5683',
        stats: {
            sold: 38,
            medianSalePrice: '$744k',
            rating: 5.0,
            reviewCount: 30
        },
        agencyColor: '#1a1a2e'
    },
    {
        name: 'James Kemp',
        role: 'Property Consultant',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
        email: 'james@nitschke.com.au',
        phoneNumber: '+61 8 1234 5684',
        stats: {
            sold: 35,
            medianSalePrice: '$750k',
            rating: 5.0,
            reviewCount: 36
        },
        agencyColor: '#1a1a2e'
    },
    {
        name: 'Blythe Stafford',
        role: 'Field Services',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        email: 'blythe@nitschke.com.au',
        phoneNumber: '+61 8 1234 5685',
        stats: {
            leased: 3,
            medianLeasedPrice: '$600'
        },
        agencyColor: '#1a1a2e'
    },
    {
        name: 'Sarah Mitchell',
        role: 'Sales Agent',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
        email: 'sarah@nitschke.com.au',
        phoneNumber: '+61 8 1234 5686',
        stats: {
            sold: 28,
            medianSalePrice: '$820k',
            rating: 4.9,
            reviewCount: 52
        },
        agencyColor: '#1a1a2e'
    },
    {
        name: 'Tom Harrison',
        role: 'Property Manager',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
        email: 'tom@nitschke.com.au',
        phoneNumber: '+61 8 1234 5687',
        stats: {
            forRent: 5,
            leased: 15
        },
        agencyColor: '#1a1a2e'
    }
];

const shortDescription = 'Nitschke Real Estate is a family-owned agency that has been serving the Mount Barker community for over 20 years. We pride ourselves on exceptional customer service and local market expertise.';

const longDescription = 'Nitschke Real Estate is a family-owned agency that has been serving the Mount Barker community for over 20 years. We pride ourselves on exceptional customer service and local market expertise.\n\nOur team of dedicated professionals brings together decades of combined experience in residential sales, property management, and investment advice. We understand that buying or selling a property is one of the most significant decisions you will make, and we are committed to making the process as smooth and stress-free as possible.\n\nWe believe in building long-term relationships with our clients, based on trust, transparency, and results. Our deep knowledge of the local area, combined with cutting-edge marketing strategies and technology, ensures that your property receives maximum exposure to the right buyers.\n\nWhether you are a first-home buyer, seasoned investor, or looking to sell your family home, our team is here to guide you every step of the way. We take the time to understand your unique needs and goals, and we work tirelessly to exceed your expectations.\n\nAt Nitschke Real Estate, we are not just selling properties – we are helping people achieve their dreams and build their futures. That is what drives us every day, and it is why so many of our clients become lifelong friends.';


// const AgencyName = ''




export default function agencyDetailsPage(){
    const handleRequestAppraisal = () => {
        alert('Request appraisal clicked!');
    };

    const handleShare = () => {
        alert('Share clicked!');
    };
    return (
        <div className="page">
            <Navbar />
            <AgencyHero agencyLogo={''} backgroundColor={'#1a1a2e'}/>

            {/*------------------------*/}


            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <AgencyContactSummary
                        agencyName="Harcourts Adelaide City"
                        address="L1/137 Gouger Street, Adelaide SA 5000"
                        phoneNumber="+61 8 1234 5678"
                        email="info@harcourts.com.au"
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
                                            topicName="Nitschke Real Estate"
                                            description={longDescription}
                                            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                            previewLength={250}
                                            agencyColor="#1a1a2e"
                                        />
                                    </div>
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*    -------------------------------------------*/}
                            {/* Content Block 1 */}
                            <div className=" bg-gray-50 py-5">
                                <AgencyMetrics
                                    salesMetrics={salesMetrics}
                                    rentalMetrics={rentalMetrics}
                                />
                            </div>

                            {/*--------------properties----------------------------------*/}
                            <div className=" bg-gray-50 pt-4">
                                <div className="max-w-7xl mx-auto px-4 mb-1">
                                    <h4 className="text-lg font-semibold text-gray-900">
                                        Discover Our Featured Homes
                                    </h4>
                                </div>

                                <AgencyPropertyViewer
                                    properties={agencyProperties}
                                    agencyColor="#4a5568"
                                    cardsToShow={2}
                                />
                            </div>
                            {/*---------------- team ----------------------*/}
                            <div className="min-h-screen bg-gray-50 py-12">
                                <AgencyWorkerViewer
                                    workers={workers}
                                    agencyName="Nitschke Real Estate"
                                    agencyLocation="RLA 193520 - MOUNT BARKER"
                                    agencyColor="#1a1a2e"
                                    initialDisplayCount={6}
                                    loadMoreCount={10}
                                />
                            </div>




                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="lg:col-span-2">
                            <div className="bg-purple-100 rounded-lg p-2 sticky top-8">
                                {/*<div className="h-96 flex items-center justify-center border-2 border-dashed border-purple-300">*/}
                                {/*    <span className="text-purple-700 font-semibold">Sidebar (Sticky)</span>*/}

                                {/*</div>*/}
                                <AgencyContactCard
                                    agencyName="Nitschke Real Estate"
                                    agencyLocation="MOUNT BARKER"
                                    agencyLogo="https://via.placeholder.com/200x60/ffffff/1a1a2e?text=NITSCHKE"
                                    agencyColor="#4a5568"
                                    rating={4.9}
                                    reviewCount={214}
                                    phoneNumber="+61 8 1234 5678"
                                    email="info@nitschke.com.au"
                                    address="123 Main Street, Mount Barker SA 5251"
                                    licenseNumber="RLA 193520"
                                    activeListings={47}
                                    teamSize={16}
                                    onRequestAppraisal={handleRequestAppraisal}
                                    onShare={handleShare}
                                />
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