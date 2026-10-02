import React from 'react';

export function Button({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  // پالت رنگ‌های دکمه نئوبروتال
  const variants = {
    default: 'bg-retro-yellow text-black hover:bg-yellow-400',
    secondary: 'bg-retro-mint text-black hover:bg-emerald-300',
    lavender: 'bg-retro-lavender text-black hover:bg-purple-300',
    outline: 'bg-white text-black hover:bg-neutral-100',
    destructive: 'bg-retro-coral text-black hover:bg-rose-400',
    dark: 'bg-black text-white hover:bg-neutral-800',
  };

  // اندازه‌های مختلف دکمه
  const sizes = {
    sm: 'h-8 px-3 text-xs rounded-lg shadow-retro-sm',
    default: 'h-10 px-4 py-2 text-xs md:text-sm rounded-xl shadow-retro',
    lg: 'h-12 px-6 text-sm md:text-base rounded-2xl shadow-retro-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`neo-press inline-flex items-center justify-center gap-2 border-2 border-black font-black select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none transition-all ${
        variants[variant] || variants.default
      } ${sizes[size] || sizes.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
