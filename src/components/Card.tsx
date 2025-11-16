"use client";

import { useState } from "react";
import { BedDouble, Bath, CarFront, RotateCwSquare} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

export interface CardProps {
    propertyId: string | number;
    companyName?: string;
    companyLogo?: string;
    agentName?: string;
    agentPhoto?: string;
    images: string[];
    priceMin: number;
    priceMax: number;
    address: string;
    bedrooms: number;
    bathrooms: number;
    parking: number;
    size: number;
    propertyType: string;
    inspectionDate?: string;
    className?: string;
}

export default function Card({
    propertyId,
    companyName = "belle PROPERTY",
    companyLogo,
    agentName = "Josh Hunt",
    agentPhoto,
    images,
    priceMin,
    priceMax,
    address,
    bedrooms,
    bathrooms,
    parking,
    size,
    propertyType,
    inspectionDate,
    className = "",
}: CardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div
      // className={`bg-white mb-4 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow ${className}`}
      className={`bg-white mb-4 rounded-lg overflow-hidden shadow-md hover:shadow-xs transition-shadow ${className}`}
    >
      <div className="bg-[#4a6b5a] text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {companyLogo ? (
            // <img src={companyLogo} alt={companyName} className="h-6" />
              <Image
                  src={companyLogo}
                  alt={companyName}
                  // width={600}
                  // height={400}
                  // className="rounded-lg"
                  className="h-6"
              />
          ) : (
            <span className="font-semibold text-lg">{companyName}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">{agentName}</span>
          {agentPhoto && (
            <img
              src={agentPhoto}
              alt={agentName}
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
          )}
        </div>
      </div>

      {/*<div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">*/}
      {/*<div className="relative aspect-[4/2] bg-gray-200 overflow-hidden">*/}
      <div className="relative aspect-[4/2] bg-gray-200">
        <img
          src={images[currentImageIndex]}
          alt={`Property ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

        <Link
            href={`/properties/${propertyId}`}
            key={propertyId}
            className="block hover:shadow-lg transition"
        >

      <div className="p-2">
        <div className="flex items-start justify-between ">
          <h4 className="text-lg font-bold text-gray-900">
            {formatPrice(priceMin)} - {formatPrice(priceMax)}
          </h4>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Add to favorites"
          >
            <svg
              className={`w-6 h-6 ${
                isFavorite ? "fill-red-600 text-red-600" : "text-gray-400"
              }`}
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        </div>

        <p className="text-base text-gray-800 mb-2">{address}</p>

        <div className="flex items-center gap-4 text-gray-700 mb-3">
          <div className="flex items-center gap-1">
              <span><BedDouble/></span>
              <span className="font-medium">{bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
              <span><Bath /></span>
              <span className="font-medium">{bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
              <span><CarFront /></span>
              <span className="font-medium">{parking}</span>
          </div>
          <div className="flex items-center gap-1">
              <span><RotateCwSquare /></span>
              <span className="font-medium">
                  {size}m<sup>2</sup>
              </span>
          </div>
          <span className="text-gray-600">•</span>
          <span className="font-medium">{propertyType}</span>
        </div>

        {inspectionDate && (
          <p className="text-sm text-gray-600">Inspection {inspectionDate}</p>
        )}
      </div>
    </Link>
    </div>
  );
}
