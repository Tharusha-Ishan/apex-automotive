import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-sm font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-accent-gold text-luxury-black hover:bg-white',
        secondary: 'bg-luxury-charcoal text-white hover:bg-zinc-800 border border-zinc-700',
        outline: 'bg-transparent border border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-luxury-black',
        ghost: 'bg-transparent text-gray-400 hover:text-white',
        electric: 'bg-accent-blue text-white hover:bg-blue-600 shadow-[0_0_15px_rgba(0,123,255,0.3)] hover:shadow-[0_0_25px_rgba(0,123,255,0.5)]'
    };

    const sizes = {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
    };

    return (
        <button
            className={twMerge(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
};
