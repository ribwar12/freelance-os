import React from 'react';

// کامپوننت کانتینر اصلی کارت
export function Card({
  children,
  variant = 'default',
  className = '',
  ...props
}) {
  const variants = {
    default: 'bg-white',
    mint: 'bg-retro-mint',
    yellow: 'bg-retro-yellow',
    lavender: 'bg-retro-lavender',
    coral: 'bg-retro-coral',
    cream: 'bg-[#FDFBF7]',
  };

  return (
    <div
      className={`rounded-2xl border-2 border-black text-black shadow-retro overflow-hidden transition-all ${
        variants[variant] || variants.default
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// هدر کارت (بخش بالایی)
export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`flex flex-col space-y-1.5 p-5 md:p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

// عنوان اصلی کارت
export function CardTitle({ children, className = '', ...props }) {
  return (
    <h3 className={`font-black text-base md:text-lg leading-snug tracking-tight text-black ${className}`} {...props}>
      {children}
    </h3>
  );
}

// توضیحات زیر عنوان
export function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={`text-xs font-semibold text-neutral-700 ${className}`} {...props}>
      {children}
    </p>
  );
}

// بدنه اصلی محتوای کارت
export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`p-5 md:p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

// فوتر یا بخش پایینی کارت (مخصوص دکمه‌ها)
export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`flex items-center p-5 md:p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Card;
