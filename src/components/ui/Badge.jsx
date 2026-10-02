import React from 'react';

export function Badge({
  children,
  variant = 'default',
  className = '',
  ...props
}) {
  const variants = {
    default: 'bg-retro-yellow text-black',
    paid: 'bg-retro-mint text-black',
    pending: 'bg-retro-yellow text-black',
    overdue: 'bg-retro-coral text-black',
    draft: 'bg-retro-slate text-black',
    live: 'bg-emerald-300 text-black',
    secondary: 'bg-retro-lavender text-black',
    outline: 'bg-white text-black',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border-2 border-black px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider select-none font-mono shadow-[2px_2px_0px_#000000] ${
        variants[variant] || variants.default
      } ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
