// components/Pagination.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
}

export default function Pagination({
                                       currentPage,
                                       totalPages,
                                       baseUrl,
                                   }: PaginationProps) {
    const searchParams = useSearchParams();

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        return `${baseUrl}?${params.toString()}`;
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showEllipsis = totalPages > 7;

        if (!showEllipsis) {
            // Show all pages if 7 or fewer
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage <= 3) {
                // Near the start
                pages.push(2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Near the end
                pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                // In the middle
                pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            {/* Previous Button */}
            {currentPage > 1 ? (
                <Link
                    href={createPageUrl(currentPage - 1)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                    Previous
                </Link>
            ) : (
                <button
                    disabled
                    className="px-4 py-2 border border-gray-200 rounded-md text-gray-400 cursor-not-allowed"
                >
                    Previous
                </button>
            )}

            {/* Page Numbers */}
            <div className="flex gap-2">
                {getPageNumbers().map((page, index) => {
                    if (page === '...') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-4 py-2 text-gray-500"
                            >
                ...
              </span>
                        );
                    }

                    const pageNum = page as number;
                    const isActive = pageNum === currentPage;

                    return (
                        <Link
                            key={pageNum}
                            href={createPageUrl(pageNum)}
                            className={`px-4 py-2 rounded-md transition-colors ${
                                isActive
                                    ? 'bg-red text-white font-semibold'
                                    : 'border border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {pageNum}
                        </Link>
                    );
                })}
            </div>

            {/* Next Button */}
            {currentPage < totalPages ? (
                <Link
                    href={createPageUrl(currentPage + 1)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                    Next
                </Link>
            ) : (
                <button
                    disabled
                    className="px-4 py-2 border border-gray-200 rounded-md text-gray-400 cursor-not-allowed"
                >
                    Next
                </button>
            )}
        </div>
    );
}