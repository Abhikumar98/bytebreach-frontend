import { styled } from '@mui/material';
import React, { FC } from 'react';

import { IProjectStatus, projectStatusText } from '@/types';

const StyledProjectStatusPill = styled('div', {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: IProjectStatus }>`
  background: ${({ theme }) => theme.palette.secondary.light};
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
      {projectStatusText[status]}
    </StyledProjectStatusPill>
  );
};

export default ProjectStatusPill;
