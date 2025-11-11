'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface FilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: () => void;
    onReset: () => void;
    children: React.ReactNode;
    className?: string;
}

export default function FilterDrawer({
    isOpen,
    onClose,
    onApply,
    onReset,
    children,
    className = ''
}: FilterDrawerProps) {
    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black bg-opacity-25 z-30"
                onClick={onClose}
            />
            <div className={`bg-white border-t border-gray-300 shadow-lg z-40 ${className}`}>
                <div className="max-w-5xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-6 mb-6">
                        {children}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                            onClick={onReset}
                            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Reset all
                        </button>
                        <button
                            onClick={onApply}
                            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                            Apply filters
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
