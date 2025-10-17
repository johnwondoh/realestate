"use client";

import { useState } from "react";

export type SearchTab = "Buy" | "Rent" | "Sold" | "Address" | "Agents";

export interface BaseSearchProps {
  defaultTab?: SearchTab;
  onSearch?: (query: string, tab: SearchTab) => void;
  onFilterClick?: () => void;
  placeholder?: string;
  className?: string;
}

export default function BaseSearch({
  defaultTab = "Buy",
  onSearch,
  onFilterClick,
  placeholder = "Search suburb, postcode or state",
  className = "",
}: BaseSearchProps) {
  const [activeTab, setActiveTab] = useState<SearchTab>(defaultTab);
  const [searchQuery, setSearchQuery] = useState("");

  const tabs: SearchTab[] = ["Buy", "Rent", "Sold", "Address", "Agents"];

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery, activeTab);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`bg-white ${className}`}>
      <div className="border-b border-light-300">
        <div className="flex gap-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-body-medium font-medium transition-colors relative ${
                activeTab === tab
                  ? "text-dark-900"
                  : "text-dark-700 hover:text-dark-900"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-red rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 flex items-center gap-4">
        <div className="flex-1 flex items-center gap-3 bg-white border border-light-300 rounded-full px-6 py-4">
          <svg
            className="w-6 h-6 text-dark-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1 text-body text-dark-700 placeholder:text-dark-500 outline-none"
          />
        </div>

        <button
          onClick={onFilterClick}
          className="flex items-center gap-2 px-8 py-4 border border-dark-900 rounded-full text-body-medium font-medium text-dark-900 hover:bg-light-200 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4h18M3 12h12M3 20h6"
            />
          </svg>
          Filters
        </button>

        <button
          onClick={handleSearch}
          className="px-10 py-4 bg-red text-white rounded-full text-body-medium font-medium hover:bg-red/90 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
}
