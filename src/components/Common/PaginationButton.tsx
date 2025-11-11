import React from "react";

interface PaginationButtonProps {
    onClick: () => void;
    disabled?: boolean;
    isActive?: boolean;
    children: React.ReactNode;
    variant?: 'nav' | 'page';
}

export default function PaginationButton({
   onClick,
   disabled = false,
   isActive = false,
   children,
   variant = 'page'
}: PaginationButtonProps) {
    if (variant === 'nav') {
        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className={`p-3 rounded-xl transition-all ${
                    disabled
                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow-md border-2 border-gray-100'
                }`}
            >
                {children}
            </button>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`min-w-[48px] h-12 px-4 rounded-xl font-semibold text-sm transition-all ${
                isActive
                    ? 'bg-blue-600 text-white shadow-md hover:shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm border-2 border-gray-100'
            }`}
        >
            {children}
        </button>
    );
};
