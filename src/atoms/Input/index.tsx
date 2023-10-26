import React, { InputHTMLAttributes, ReactNode } from 'react';

const Input: React.FC<
  { icon?: ReactNode } & InputHTMLAttributes<HTMLInputElement>
> = ({ icon, ...inputProps }) => {
  return (
    <div className='app-input relative mt-2 rounded-md shadow-sm'>
      <input
        className='block w-full rounded-full border-0 py-3 pl-5 pr-20 text-lg text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        {...inputProps}
      />
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5'>
        {icon}
      </div>
    </div>
  );
};

export default Input;
