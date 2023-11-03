import {
  Button,
  Divider,
  Icon,
  Modal as MaterialModal,
  ModalProps,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import React, { ReactNode } from 'react';

import Close from '@/assets/close.svg';

const ModalChildContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isCTAPresent',
})<{ isCTAPresent: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.palette.background.default};
  max-width: 38rem;
  width: 100%;
  max-height: calc(100vh - 4rem);
  overflow: auto;
  padding: ${({ theme }) => theme.spacing(6)};
  padding-bottom: ${({ theme, isCTAPresent }) =>
    !isCTAPresent ? theme.spacing(0) : theme.spacing(6)};
  border-radius: 1rem;
  margin: auto;

  .modal-child-container {
    padding-top: ${({ theme }) => theme.spacing(3)};
    padding-bottom: ${({ theme }) => theme.spacing(5)};
  }

  .button-container {
    display: flex;
    justify-content: center;
  }
`;

export const ModalFormCTA: React.FC<{
  children: string | ReactNode;
  onClick?: () => void;
}> = ({ children, onClick }) => {
  return (
    <div className='-pb-5 mt-5 flex justify-center'>
      <Button size='large' onClick={onClick} variant='contained' type='submit'>
        {children}
      </Button>
    </div>
  );
};

const Modal: React.FC<
  {
    children?: React.ReactNode;
    description?: string;
    ctaText?: string;
    onCTAClick?: () => void;
  } & ModalProps
> = ({ children, ...modalProps }) => {
  const theme = useTheme();

  return (
    <MaterialModal
      {...modalProps}
      sx={{
        overflow: 'auto',
        backdropFilter: 'blur(5px)',
      }}
    >
      <ModalChildContainer isCTAPresent={!!modalProps.onCTAClick}>
        <div className='flex items-center justify-between'>
          <Typography variant='h6' fontWeight='medium'>
            {modalProps.title}
          </Typography>
          <div onClick={() => modalProps?.onClose?.({}, 'backdropClick')}>
            <Icon
              sx={{
                background: theme.palette.secondary.light,
                borderRadius: '0.5rem',
                padding: theme.spacing(1),
                cursor: 'pointer',
              }}
            >
              <Close />
            </Icon>
          </div>
        </div>
        <Typography variant='subtitle1'>{modalProps.description}</Typography>
        <Divider
          sx={{
            padding: `${theme.spacing(2)} 0`,
          }}
        />
        <div className='modal-child-container'>{children}</div>
        {modalProps.onCTAClick && (
          <div className='button-container'>
            <ModalFormCTA onClick={modalProps.onCTAClick}>
              {modalProps.ctaText ?? 'Submit'}
            </ModalFormCTA>
          </div>
        )}
      </ModalChildContainer>
    </MaterialModal>
  );
};

export default Modal;
