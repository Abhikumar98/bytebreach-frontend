import { Color, styled } from '@mui/material';
import React, { FC } from 'react';

import { clientProjectStatusText, IProjectStatus } from '@/types';

const StyledProjectStatusPill = styled('div', {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: IProjectStatus }>`
  background: ${({ theme }) =>
    (theme.palette.secondary as Partial<Color>)[100]};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  border-radius: 0.5rem;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
`;

const ProjectStatusPill: FC<{
  status: IProjectStatus;
}> = ({ status }) => {
  return (
    <StyledProjectStatusPill status={status}>
      {clientProjectStatusText[status]}
    </StyledProjectStatusPill>
  );
};

export default ProjectStatusPill;
