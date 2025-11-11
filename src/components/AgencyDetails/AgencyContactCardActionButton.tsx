import React from 'react';


interface ActionButtonProps {
    onClick: () => void;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
}

export default function AgencyContactCardActionButton({
   onClick,
   icon: Icon,
   label,
   variant = 'secondary',
   fullWidth = true
}: ActionButtonProps) {
    const baseClasses = `flex items-center justify-center gap-3 px-6 py-1.5 rounded-lg font-semibold text-sm transition-colors ${
        fullWidth ? 'w-full' : ''
    }`;

    const variantClasses = variant === 'primary'
        ? 'bg-red-600 text-white hover:bg-red-700'
        : 'bg-white border-1 border-gray-800 text-gray-800 hover:bg-gray-50';

    return (
        <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
            <Icon className="w-4 h-4" />
            {label}
        </button>
    );
};