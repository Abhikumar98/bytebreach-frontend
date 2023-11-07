import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { SimplePaletteColorOptions, styled, Typography } from '@mui/material';
import React, { FC, useEffect } from 'react';

import useTheme from '@/hooks/useTheme';

import EditIcon from '@/assets/pencil.svg';
import ShadowCard from '@/atoms/ShadowCard';

const StyledInlineEdit = styled('div')`
  width: 100%;
  svg {
    height: 16px;
    width: 16px;
    cursor: pointer;
  }

  .editor-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  .text-wrapper {
    padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
    margin: -${({ theme }) => theme.spacing(2)};
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    color: ${({ theme }) => theme.palette?.secondary.contrastText};
    font-size: 1rem;
    font-weight: 500;
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid ${({ theme }) => theme.palette?.secondary.light};
  }
`;

const InlineEdit: FC<{
  value: string;
  label?: string;
  onSave: (value: string) => void;
}> = ({ value, label, onSave }) => {
  const theme = useTheme();

  const inputRef = React.useRef<HTMLInputElement>(null);
  const iconRef = React.useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = React.useState(false);

  const [inputValue, setInputValue] = React.useState(value);

  const handleCancel = () => {
    console.log('herere');
    setIsEditing(false);
    setInputValue(value);
  };

  const handleSubmit = () => {
    setIsEditing(false);
    onSave(inputValue);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    console.log(
      {
        iconRef,
        e: e.target,
      },
      iconRef.current?.contains(e.target as Node),
      inputRef.current?.contains(e.target as Node),
      isEditing
    );

    if (
      !iconRef.current?.contains(e.target as Node) &&
      !inputRef.current?.contains(e.target as Node) &&
      isEditing
    ) {
      handleCancel();
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('click', handleOutsideClick, {
        capture: true,
      });
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick, {
        capture: true,
      });
    };
  }, [isEditing]);

  return (
    <StyledInlineEdit>
      <ShadowCard size='small'>
        <Typography
          color={
            (theme.palette?.secondary as SimplePaletteColorOptions)
              ?.contrastText
          }
          sx={{
            marginBottom: '0.5rem',
          }}
        >
          {label}
        </Typography>
        <div className='editor-container'>
          {isEditing ? (
            <>
              <input
                className='text-wrapper'
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div ref={iconRef} className='mx-2 flex items-center space-x-2'>
                <div onClick={handleSubmit}>
                  <CheckIcon />
                </div>
                <div onClick={handleCancel}>
                  <CloseIcon />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='text-wrapper'>{value}</div>
              <div ref={iconRef} onClick={() => setIsEditing(true)}>
                <EditIcon />
              </div>
            </>
          )}
        </div>
      </ShadowCard>
    </StyledInlineEdit>
  );
};

export default InlineEdit;
