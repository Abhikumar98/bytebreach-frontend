import { styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { defaultErrorMessage } from '@/lib/helper';

import Button from '@/atoms/Button';
import ShadowCard from '@/atoms/ShadowCard';
import TableComponent, { Column } from '@/atoms/Table';
import { getAuditorStatus, postAuditorConfirmation } from '@/services';

import {
  auditorStatusLabel,
  IAuditorConfirmationStatus,
  IAuditorStatusResponse,
} from '@/types';

const StyledAuditorStatusPill = styled('div', {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: IAuditorConfirmationStatus }>`
  background: ${({ theme, status }) =>
    status === IAuditorConfirmationStatus.QUOTATION_REJECTED
      ? theme.palette.error.light
      : theme.palette.secondary.light};
  color: ${({ theme, status }) =>
    status === IAuditorConfirmationStatus.QUOTATION_REJECTED
      ? theme.palette.error.contrastText
      : theme.palette.secondary.contrastText};
  border-radius: 0.5rem;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  width: fit-content;
`;

const AuditorStatusPill: FC<{
  status: IAuditorConfirmationStatus;
}> = ({ status }) => {
  return (
    <StyledAuditorStatusPill status={status}>
      {auditorStatusLabel[status]}
    </StyledAuditorStatusPill>
  );
};

const AuditorTable: FC<{
  handleUpdateProject: () => Promise<void>;
}> = ({ handleUpdateProject }) => {
  const {
    query: { projectId },
  } = useRouter();

  const [selectedAuditors, setSelectedAuditors] = React.useState<
    IAuditorStatusResponse[]
  >([]);

  const [auditorStatus, setAuditorStatus] = React.useState<
    IAuditorStatusResponse[]
  >([]);

  const fetchAuditorStatus = async () => {
    try {
      const response = await getAuditorStatus(Number(projectId));
      setAuditorStatus(response);
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  React.useEffect(() => {
    fetchAuditorStatus();
  }, []);

  const auditorColumns: Column<IAuditorStatusResponse>[] = [
    {
      title: 'Auditor',
      dataIndex: 'first_name',
      render: (text, record) => {
        return (
          <Typography>
            {record.first_name} {record.last_name}
          </Typography>
        );
      },
      disabled: (record: IAuditorStatusResponse) => {
        return [
          IAuditorConfirmationStatus.CLIENT_REJECTED,
          IAuditorConfirmationStatus.QUOTATION_REJECTED,
        ].includes(record.state);
      },
    },
    {
      title: 'Status',
      dataIndex: 'state',
      render: (text, record) => {
        return (
          <Typography>
            <AuditorStatusPill status={record.state} />
          </Typography>
        );
      },
    },
    {
      title: 'Quote',
      dataIndex: 'quotation_cost',
      render: (text, record) => {
        return <Typography>$ {record.quotation_cost}</Typography>;
      },
    },
    {
      title: 'Time',
      dataIndex: 'quotation_time',
      render: (text, record) => {
        return <Typography>{record.quotation_time} days</Typography>;
      },
    },
  ];

  const handleAuditorsSelection = async () => {
    try {
      const auditorIds = selectedAuditors.map((auditor) => auditor.auditor_id);

      await postAuditorConfirmation(Number(projectId), auditorIds);
      await handleUpdateProject();
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  return (
    <ShadowCard>
      <Typography variant='h5'>Select auditors quotation</Typography>
      <TableComponent
        onSelectionChange={setSelectedAuditors}
        isSelectable
        data={auditorStatus}
        columns={auditorColumns}
      />
      <div className='my-4 flex justify-center'>
        <Button onClick={handleAuditorsSelection} size='medium'>
          Proceed
        </Button>
      </div>
    </ShadowCard>
  );
};

export default AuditorTable;
