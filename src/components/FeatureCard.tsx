"use client";

import Link from "next/link";
import { ReactNode } from "react";

export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  className?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  linkText,
  linkHref,
  className = "",
}: FeatureCardProps) {
  return (
    <Link
      href={linkHref}
      className={`block bg-white rounded-2xl border border-light-300 p-8 hover:shadow-lg transition-shadow ${className}`}
    >
      <div className="mb-6">{icon}</div>

      <h3 className="text-heading-3 font-medium text-dark-900 mb-3">
        {title}
      </h3>

      <p className="text-body text-dark-700 mb-4">{description}</p>

      <span className="text-body-medium text-blue-600 hover:text-blue-700 inline-flex items-center">
        {linkText}
        <svg
          className="w-4 h-4 ml-1"
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
      </span>
    </Link>
  );
}
