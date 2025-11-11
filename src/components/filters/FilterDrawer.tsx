'use client';

import { useEffect, useState } from 'react';
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
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    isAnimating ? 'bg-opacity-25' : 'bg-opacity-0'
                }`}
                onClick={onClose}
            />
            <div
                className={`relative w-full bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out ${
                    isAnimating ? 'translate-y-0' : 'translate-y-full'
                } ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="max-w-5xl mx-auto px-6 py-6 max-h-[80vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-6 sticky top-0 bg-white pb-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                            aria-label="Close filters"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-6 mb-6">
                        {children}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
                        <button
                            onClick={onReset}
                            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Reset all
                        </button>
                        <button
                            onClick={onApply}
                            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Apply filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
