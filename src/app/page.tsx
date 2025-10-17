'use client';

import React from 'react';
import Card from '@/components/Card';
import BaseSearch from '@/components/BaseSearch';
import FeatureCard from '@/components/FeatureCard';

const housesData = [
  {
    id: 1,
    companyName: "Premier Homes",
    agentName: "Sarah Johnson",
    images: ["/houses/1.smallmodhomesFEAT.jpg"],
    priceMin: 420000,
    priceMax: 450000,
    address: "123 Maple Street, Suburban Heights",
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    size: 245,
    propertyType: "House",
    inspectionDate: "Saturday 11:00am - 11:30am"
  },
  {
    id: 2,
    companyName: "Elite Properties",
    agentName: "Michael Chen",
    images: ["/houses/101318214_preview-6e44a19fb4af42559cdf1b749a7e9148.jpg"],
    priceMin: 800000,
    priceMax: 850000,
    address: "456 Ocean View Drive, Coastal Bay",
    bedrooms: 5,
    bathrooms: 4,
    parking: 3,
    size: 385,
    propertyType: "Villa",
    inspectionDate: "Saturday 2:00pm - 2:30pm"
  },
  {
    id: 3,
    companyName: "Comfort Living",
    agentName: "Emma Wilson",
    images: ["/houses/9024-Main-Image_1600x.jpg.webp"],
    priceMin: 265000,
    priceMax: 280000,
    address: "789 Garden Lane, Peaceful Grove",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    size: 145,
    propertyType: "Cottage",
    inspectionDate: "Sunday 10:00am - 10:30am"
  },
  {
    id: 4,
    companyName: "City Dwellings",
    agentName: "James Martinez",
    images: ["/houses/Atlanta-Series-1190x680.webp"],
    priceMin: 380000,
    priceMax: 395000,
    address: "321 Downtown Boulevard, Metro City",
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    size: 185,
    propertyType: "Townhouse",
    inspectionDate: "Saturday 3:00pm - 3:30pm"
  },
  {
    id: 5,
    companyName: "Greenfield Estates",
    agentName: "Olivia Brown",
    images: ["/houses/craftsman-exterior.jpg"],
    priceMin: 500000,
    priceMax: 520000,
    address: "567 Park Avenue, Green Valley",
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    size: 285,
    propertyType: "House",
    inspectionDate: "Sunday 1:00pm - 1:30pm"
  },
  {
    id: 6,
    companyName: "Coastal Living",
    agentName: "Daniel White",
    images: ["/houses/facade-min.png.webp"],
    priceMin: 700000,
    priceMax: 720000,
    address: "890 Beachfront Road, Sunset Shores",
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    size: 225,
    propertyType: "Beach House",
    inspectionDate: "Saturday 4:00pm - 4:30pm"
  }
];

const Home = () => {
  const handleSearch = (query: string, tab: string) => {
    console.log('Search:', query, 'Tab:', tab);
  };

  const handleFilterClick = () => {
    console.log('Filters clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="mb-8">
        <BaseSearch onSearch={handleSearch} onFilterClick={handleFilterClick} />
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-12">
          <h2 className="text-heading-2 font-bold text-dark-900 mb-8">Feature Components Demo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <FeatureCard
              icon={
                <svg className="w-16 h-16 text-red" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              }
              title="Get estimated property prices with a realEstimate™"
              description="See how much your property's worth whether you own it or want to buy it."
              linkText="Check property values"
              linkHref="/property-values"
            />
            <FeatureCard
              icon={
                <svg className="w-16 h-16 text-red" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              }
              title="Find the best agents in your area"
              description="Connect with top-rated real estate agents who know your market inside and out."
              linkText="Browse agents"
              linkHref="/agents"
            />
            <FeatureCard
              icon={
                <svg className="w-16 h-16 text-red" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
                </svg>
              }
              title="Track your property portfolio"
              description="Monitor all your properties in one place with real-time market updates."
              linkText="Get started"
              linkHref="/portfolio"
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-heading-2 font-bold text-dark-900 mb-8">Available Houses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {housesData.map((house) => (
              <Card
                key={house.id}
                companyName={house.companyName}
                agentName={house.agentName}
                images={house.images}
                priceMin={house.priceMin}
                priceMax={house.priceMax}
                address={house.address}
                bedrooms={house.bedrooms}
                bathrooms={house.bathrooms}
                parking={house.parking}
                size={house.size}
                propertyType={house.propertyType}
                inspectionDate={house.inspectionDate}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
