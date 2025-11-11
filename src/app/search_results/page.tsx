// app/search_results/page.tsx (or properties/page.tsx)
import React from 'react';
import { db } from '@/lib/db';
import { properties, agents, agencies } from '@/lib/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import Card from '@/components/Card';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertySearchSummary from "@/components/PropertySearchSummary";
import PropertySort from "@/components/PropertySort";
import SearchFilters from "@/components/filters/SearchFilters";
import Pagination from "@/components/Pagination";
import {getPropertiesAction} from "@/lib/db/actions/properties";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        sort?: string;
        suburb?: string;
        minPrice?: string
    }>;
}

const ITEMS_PER_PAGE = 10;

export default async function PropertiesPage({ searchParams }: PageProps) {
    // Await searchParams
    const params = await searchParams;
    // const currentPage = Number(params.page) || 1;
    const sortBy = params.sort || 'featured';


    const result = await getPropertiesAction(params);

    if (!result.success) {
        return <div>Error loading properties</div>;
    }

    // const { properties, totalCount, currentPage, totalPages } = result.data;
    const { properties, totalCount, currentPage, totalPages } = result.data;


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="py-2 border-b border-t-1 border-light-400 bg-white md:sticky z-10 top-0">
                <div className="max-w-5xl mx-auto">
                    <SearchFilters />
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2 mt-3">
                <section className="mb-5 border-b border-light-400">
                    <PropertySearchSummary
                        title="Real Estate & Property for sale"
                        totalProperties={totalCount}
                        currentPage={currentPage}
                        pageSize={ITEMS_PER_PAGE}
                    />
                </section>

                <div className="px-5 py-2 bg-gray-50">
                    <PropertySort />
                </div>

                <section className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-screen">
                        <div className="md:col-span-9 p-6">
                            <div className="mb-4 space-y-6">
                                {properties.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500 text-lg">No properties found</p>
                                    </div>
                                ) : (
                                    properties.map(({ property, agent, agency }) => (
                                        <Card
                                            key={property.id}
                                            companyName={agency?.name || 'N/A'}
                                            agentName={
                                                agent
                                                    ? `${agent.firstName} ${agent.lastName}`
                                                    : 'N/A'
                                            }
                                            images={property.images || []}
                                            priceMin={Number(property.minPrice)}
                                            priceMax={Number(property.maxPrice)}
                                            address={`${property.address}, ${property.city}, ${property.state} ${property.zip}`}
                                            bedrooms={property.bedrooms}
                                            bathrooms={Number(property.bathrooms)}
                                            parking={0}
                                            size={property.sqft || 0}
                                            propertyType={property.propertyType}
                                            inspectionDate="Contact agent"
                                        />
                                    ))
                                )}
                            </div>

                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    baseUrl="/search_results"
                                />
                            )}
                        </div>

                        <div className="md:col-span-3">
                            <div className="h-96 bg-gray-200 sticky md:top-6 rounded-lg flex items-center justify-center">
                                <p className="text-gray-500">Ad Space</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

