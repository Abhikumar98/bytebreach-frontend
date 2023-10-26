import React, { InputHTMLAttributes, ReactNode } from 'react';

const Input: React.FC<
  { icon?: ReactNode; label?: string } & InputHTMLAttributes<HTMLInputElement>
> = ({ icon, label, ...inputProps }) => {
  return (
    <div className='app-input relative mt-2 space-y-2'>
      <label htmlFor={inputProps.id} className='text-lg font-semibold'>
        {label}
      </label>
      <input
        className='ring-gray block w-full rounded-full border-0 py-3 pl-5 pr-20 text-lg text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:leading-6'
        {...inputProps}
      />
      <div className='pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center pr-5'>
        {icon}
      </div>
    </div>
  );
};

export default Input;
