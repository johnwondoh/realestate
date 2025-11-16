// "use client";

import React from 'react';

import PropertyDescription from "@/components/PropertyDetails/PropertyDescription";
import PropertyFeatures from "@/components/PropertyDetails/PropertyFeatures";
import AgentContactCard from "@/components/Common/AgentContactCard";
import PropertyMap from "@/components/PropertyDetails/PropertyMap";
import PropertyHero from "@/components/PropertyDetails/PropertyHero";
import PropertyBasicInspection from "@/components/PropertyDetails/PropertyBasicInspection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {getPropertiesAction, getPropertyAction, SinglePropertyActionResult} from "@/lib/db/actions/properties";
import {PropertySearchParams} from "@/lib/utils/property-filters";
import { notFound } from 'next/navigation';


import * as sea from "node:sea";

interface PageProps {
    searchParams: Promise<{
        id?: string | number;
    }>;
}
// export default async function PropertyDetailsPage({params}: { params: { id: string } })

// export default async function PropertyDetailsPage({ searchParams }: PageProps) {
// export default async function PropertyDetailsPage({searchParams}: PageProps) {
export default async function PropertyDetailPage({params}: { params: { id: string | number } ; }){
    // const result = await getPropertiesAction({id: id});
    // const params = await searchParams;

    console.log(params);

    const propertyId = typeof params.id === 'string' ? parseInt(params.id) : params.id;

    if ( (propertyId === undefined) || isNaN(propertyId)) {
        return {
            success: false,
            error: 'Invalid property ID',
        };
    }
    console.log(params)


    // const result = await getPropertiesAction(params);
    const result = await getPropertyAction(propertyId);

    if (!result.success) {
        notFound(); // Shows 404 page
    }

    const { property, agent, agency } = result.data;

    // console.log(result);
    return (
        <>
            <Navbar/>
            <PropertyHero
                address={property.address}
                bed={property.bedrooms}
                bath={property.bathrooms}
                size={property.sqft}
                propertyType={property.propertyType}
                minPrice={property.minPrice}
                maxPrice={property.maxPrice}
                images={property.images}
            />
            {/*<div className="space-y-12 p-8 bg-gray-50">*/}
            <div className="space-y-12 p-8 ">
                    {/* OPTION 1: CSS Grid (Recommended) */}
                <div className="space-y-4">

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-screen">
                        {/* Main Content - 8 columns (~67%) */}
                        {/*<div className="md:col-span-2 bg-blue-200 p-6 rounded-lg">*/}
                        <div className="md:col-span-2"></div>

                        {/* Main Content - 8 columns (~67%) */}
                        <div className="md:col-span-6 p-6 ">
                            <div className="space-y-4">
                                <div className="border-b bg-gray-400 border-gray-200">
                                    <PropertyDescription
                                    />
                                </div>
                                <div className="border-b border-gray-200">
                                    <PropertyFeatures/>
                                </div>
                                <div className="border-b border-gray-200">
                                    ---------- map here -------------
                                    {/*<PropertyMap/>*/}
                                </div>
                                <div className="border-b border-gray-200">
                                    <PropertyBasicInspection/>
                                </div>
                                {/*<div className="bg-white p-4 rounded h-64 flex items-center justify-center">*/}
                                {/*    Map Section*/}
                                {/*</div>*/}

                            </div>
                        </div>

                        {/* Sidebar - 3 columns (~33%) */}
                        <div className="md:col-span-3">
                            <div className="md:sticky md:top-6 p-3 rounded-lg">
                                {/*<div className="bg-white p-4 rounded h-96 flex items-center justify-center">*/}
                                    <AgentContactCard/>
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className="md:col-span-1">
                        </div>
                    </div>
                </div>
            </div>

                                            {/* OPTION 2: Flexbox with Percentage */}





            {/*<PropertyDescription/>*/}
            {/*<PropertyFeatures/>*/}
            {/*<AgentContactCard/>*/}
            {/*<PropertyMap/>*/}
            <Footer/>
        </>
    );
}