import React from 'react';

export function Input({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`flex h-11 w-full rounded-xl border-2 border-black bg-white px-3.5 py-2 text-xs md:text-sm font-semibold text-black placeholder:text-neutral-500 shadow-retro-sm transition-all focus:outline-none focus:ring-2 focus:ring-retro-yellow focus:shadow-retro disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

export default Input;
