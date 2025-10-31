"use client";

import React from 'react';

import AgencyHero from "@/components/AgencyDetails/AgencyHero";
import Navbar from "@/components/Navbar";
import AgencyContactSummary from "@/components/AgencyDetails/AgencyContactSummary";
// import {AgencyMetricStatCard} from "@/components/AgencyDetails/AgencyMetricStatCard";
import AgencyMetrics from "@/components/AgencyDetails/AgencyMetrics";
import {AgencyMetricStatCardProps} from "@/components/AgencyDetails/AgencyMetricStatCard";
import {PropertyAgencyCardProps} from "@/components/AgencyDetails/PropertyAgencyCard";

import AgencyPropertyViewer from "@/components/AgencyDetails/AgencyPropertyViewer";
import Demo from "@/components/AgencyDetails/AgencyWorkerCard";
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

const agencyProperties: PropertyAgencyCardProps[] = [
    {
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
        price: '$730,000 - $760,000',
        address: '7 Ashfield Street',
        suburb: 'Mount Barker',
        state: 'SA',
        postcode: '5251',
        propertyType: 'House',
        features: { bedrooms: 3, bathrooms: 2, parking: 2 }
    },
    {
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
        price: '$740,000 - $780,000',
        address: '101 Princes Highway',
        suburb: 'Littlehampton',
        state: 'SA',
        propertyType: 'House',
        features: { bedrooms: 3, bathrooms: 1, parking: 3 }
    },
    {
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
        price: '$520,000 - $550,000',
        address: '25 Garden Avenue',
        suburb: 'Adelaide',
        state: 'SA',
        postcode: '5000',
        propertyType: 'Apartment',
        features: { bedrooms: 2, bathrooms: 2, parking: 1 }
    },
    {
        image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
        price: '$895,000',
        address: '42 Coastal Drive',
        suburb: 'Glenelg',
        state: 'SA',
        postcode: '5045',
        propertyType: 'Villa',
        features: { bedrooms: 4, bathrooms: 2, parking: 2 }
    },
    {
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
        price: '$650,000',
        address: '88 Beach Road',
        suburb: 'Henley Beach',
        state: 'SA',
        postcode: '5022',
        propertyType: 'Townhouse',
        features: { bedrooms: 3, bathrooms: 2, parking: 2 }
    }
    ]



export default function agencyDetailsPage(){
    return (
        <div className="page">
            <Navbar />
            <AgencyHero agencyLogo={''} backgroundColor={'#1a1a2e'}/>
            <div className="page">
                <AgencyContactSummary
                    agencyName="Harcourts Adelaide City"
                    address="L1/137 Gouger Street, Adelaide SA 5000"
                    phoneNumber="+61 8 1234 5678"
                    email="info@harcourts.com.au"
                />
                <div className="min-h-screen bg-gray-50 py-12">
                    <AgencyMetrics
                        salesMetrics={salesMetrics}
                        rentalMetrics={rentalMetrics}
                    />
                </div>
                {/*------------------------------------------------*/}
                <div className="min-h-screen bg-gray-50 py-12">
                    <div className="max-w-7xl mx-auto px-4 mb-12">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            NITSCHKE REAL ESTATE FEATURED PROPERTIES
                        </h1>
                        <p className="text-gray-600">Browse our featured properties</p>
                    </div>

                    <AgencyPropertyViewer
                        properties={agencyProperties}
                        agencyColor="#4a5568"
                        cardsToShow={2}
                    />
                </div>

                <Demo/>
                {/*<Demo2/>*/}

            </div>
            {/*<h1>Property Details</h1>*/}
        </div>
    )
}