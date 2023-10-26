import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';

const Button: React.FC<
  {
    children?: React.ReactNode;
    isLoading?: boolean;
  } & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, isLoading, type, className, ...props }) => {
  return (
    <button
      type='button'
      className={classNames(
        `relative rounded-full bg-white px-20 py-4 text-xl font-semibold text-black shadow-sm`,
        className,
        props.disabled ? 'cursor-not-allowed opacity-60' : ''
      )}
      {...props}
      disabled={isLoading || props.disabled}
    >
      <div
        className={classNames('h-full w-full', isLoading ? 'invisible' : '')}
      >
        {children}
      </div>
      {isLoading ? (
        <svg
          className='absolute left-1/2 top-3 mx-auto h-8 w-8 animate-spin'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            stroke-width='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      ) : null}
    </button>
  );
};

export default Button;
