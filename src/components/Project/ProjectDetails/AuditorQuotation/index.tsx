import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import toast from 'react-hot-toast';

import { defaultErrorMessage } from '@/lib/helper';

import Button from '@/atoms/Button';
import Input from '@/atoms/Input';
import Select, { IOption } from '@/atoms/Select';
import ShadowCard from '@/atoms/ShadowCard';
import { getCurrentProjectAuditorStatus, postAuditorQuote } from '@/services';

import {
  IAuditorConfirmationStatus,
  IAuditorQuoteRequest,
  IAuditorStatusResponse,
} from '@/types';

const AuditorQuotation: FC<{
  handleUpdateProject: () => Promise<void>;
}> = ({ handleUpdateProject }) => {
  const {
    query: { projectId },
  } = useRouter();

  const [auditorStatus, setAuditorStatus] =
    React.useState<IAuditorStatusResponse | null>();

  const [auditorQuote, setAuditorQuote] = React.useState<
    Partial<IAuditorQuoteRequest>
  >({
    quotation_time: 7,
    quotation_cost: 0,
  });

  const handleAuditorQuoteChange = (key: string, value: number) => {
    setAuditorQuote((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const fetchAuditorStatus = async () => {
    try {
      const response = await getCurrentProjectAuditorStatus(Number(projectId));
      setAuditorStatus(response);
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  React.useEffect(() => {
    fetchAuditorStatus();
  }, []);

  const handleAuditorsSelection = async (decision: 'accept' | 'reject') => {
    try {
      const auditorQuoteRequest: IAuditorQuoteRequest = {
        project_id: Number(projectId),
        quotation_time: auditorQuote.quotation_time ?? 0,
        quotation_cost: auditorQuote.quotation_cost ?? 0,
        quote_action: decision,
      };

      await postAuditorQuote(auditorQuoteRequest);
      await handleUpdateProject();
      await fetchAuditorStatus();

      if (decision === 'accept') {
        toast.success('Successfully submitted auditor quotation');
      } else {
        toast.success('Successfully rejected quotation');
      }
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  const auditorDaysOptions: IOption[] = [
    {
      label: '1 week',
      value: 7,
    },
    {
      label: '2 weeks',
      value: 14,
    },
    {
      label: '3 weeks',
      value: 21,
    },
    {
      label: '4 weeks',
      value: 28,
    },
    {
      label: '5 weeks',
      value: 35,
    },
    {
      label: '6 weeks',
      value: 42,
    },
  ];

  return (
    <ShadowCard>
      {auditorStatus?.status ===
        IAuditorConfirmationStatus.QUOTATION_SUBMITTED && (
        <div className='flex justify-center'>
          You successfully submitted the quotation
        </div>
      )}
      {auditorStatus?.status ===
        IAuditorConfirmationStatus.QUOTATION_REJECTED && (
        <div className='flex justify-center'>You rejected the quotation</div>
      )}
      {auditorStatus?.status === IAuditorConfirmationStatus.CLIENT_REJECTED && (
        <div className='flex justify-center'>
          You quote was rejected the client
        </div>
      )}

      {auditorStatus?.status === IAuditorConfirmationStatus.PENDING && (
        <>
          <Typography variant='h5'>Select auditors quotation</Typography>
          <div className='space-y-4'>
            <Select
              label='Audit time'
              value={auditorQuote.quotation_time}
              name='audit_name'
              options={auditorDaysOptions}
              placeholder='Time to audit project (days)'
              onChange={(e) =>
                handleAuditorQuoteChange(
                  'quotation_time',
                  e.target.value as number
                )
              }
            />
            <Input
              name='audit_cost'
              label='Audit cost ( $ )'
              onChange={(e) =>
                handleAuditorQuoteChange(
                  'quotation_cost',
                  Number(e.target.value)
                )
              }
              type='number'
              placeholder='Quote to audit project'
            />
            <div className='my-4 flex justify-center space-x-4'>
              <Button
                variant='outlined'
                color='error'
                onClick={() => handleAuditorsSelection('reject')}
                size='medium'
              >
                Reject
              </Button>
              <Button
                onClick={() => handleAuditorsSelection('accept')}
                size='medium'
              >
                Proceed
              </Button>
            </div>
          </div>
        </>
      )}
    </ShadowCard>
  );
};

export default AuditorQuotation;
