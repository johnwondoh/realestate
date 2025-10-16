"use client";

import { useState } from "react";

export interface CardProps {
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
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow ${className}`}
    >
      <div className="bg-[#4a6b5a] text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {companyLogo ? (
            <img src={companyLogo} alt={companyName} className="h-6" />
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

      <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
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

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-2xl font-bold text-gray-900">
            {formatPrice(priceMin)} - {formatPrice(priceMax)}
          </h3>
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

        <p className="text-lg text-gray-800 mb-3">{address}</p>

        <div className="flex items-center gap-4 text-gray-700 mb-3">
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-6.18C12.4 5.84 11.3 5 10 5H4c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM7 17.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25S8.25 15.31 8.25 16 7.69 17.25 7 17.25zM19 12h-3V9h1.96L19 12z" />
            </svg>
            <span className="font-medium">{bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3-6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3-3h-2V4h2v8z" />
            </svg>
            <span className="font-medium">{bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
            </svg>
            <span className="font-medium">{parking}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
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
    </div>
  );
}
