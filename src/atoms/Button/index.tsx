import React, { ButtonHTMLAttributes } from 'react';

const Button: React.FC<
  {
    children?: React.ReactNode;
  } & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, type, className, ...props }) => {
  return (
    <button
      type='button'
      className={`rounded-full bg-white px-20 py-4 text-xl font-semibold text-black shadow-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
