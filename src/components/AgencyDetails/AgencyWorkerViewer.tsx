import React, {useState} from "react";
import {AgencyWorkerCardProps} from "@/components/AgencyDetails/AgencyWorkerCard";
import AgencyWorkerCard from "./AgencyWorkerCard";

export interface AgencyWorkerViewerProps {
    workers: AgencyWorkerCardProps[];
    agencyName?: string;
    agencyLocation?: string;
    agencyColor?: string;
    initialDisplayCount?: number;
    loadMoreCount?: number;
}

export default function AgencyWorkerViewer({
   workers,
   agencyName,
   agencyLocation,
   agencyColor = '#003366',
   initialDisplayCount = 6,
   loadMoreCount = 10
}: AgencyWorkerViewerProps) {
    const [displayCount, setDisplayCount] = useState(initialDisplayCount);
    const [hasExpanded, setHasExpanded] = useState(false);

    const visibleWorkers = workers.slice(0, displayCount);
    const remainingCount = workers.length - displayCount;
    const hasMore = remainingCount > 0;

    const handleLoadMore = () => {
        setDisplayCount(prev => Math.min(prev + loadMoreCount, workers.length));
        setHasExpanded(true);
    };

    const handleShowLess = () => {
        setDisplayCount(initialDisplayCount);
        setHasExpanded(false);
        // Scroll to top of the section
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    About the team
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                    Showing {visibleWorkers.length} of {workers.length} team members
                    {agencyName && ` from ${agencyName}`}
                    {agencyLocation && ` ${agencyLocation}`} and their key performance over the last 12 months. ^
                </p>
            </div>

            {/* Workers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                {visibleWorkers.map((worker, index) => (
                    <AgencyWorkerCard
                        key={index}
                        {...worker}
                        agencyColor={agencyColor}
                    />
                ))}
            </div>

            {/* Load More / Show Less Button */}
            {(hasMore || hasExpanded) && (
                <div className="flex justify-center">
                    {hasMore ? (
                        <button
                            onClick={handleLoadMore}
                            className="px-8 py-4 bg-white border-2 border-gray-800 text-gray-800 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
                        >
                            Show {Math.min(remainingCount, loadMoreCount)} more
                        </button>
                    ) : (
                        <button
                            onClick={handleShowLess}
                            className="px-8 py-4 bg-white border-2 border-gray-800 text-gray-800 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
                        >
                            Show less
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};