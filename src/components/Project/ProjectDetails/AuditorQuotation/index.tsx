import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { defaultErrorMessage } from '@/lib/helper';

import Button from '@/atoms/Button';
import Input from '@/atoms/Input';
import ShadowCard from '@/atoms/ShadowCard';
import { getAuditorStatus, postAuditorQuote } from '@/services';

import { IAuditorQuoteRequest, IAuditorStatusResponse } from '@/types';

const AuditorQuotation: FC<{
  handleUpdateProject: () => Promise<void>;
}> = ({ handleUpdateProject }) => {
  const {
    query: { projectId },
  } = useRouter();

  const [auditorStatus, setAuditorStatus] = React.useState<
    IAuditorStatusResponse[]
  >([]);

  const [auditorQuote, setAuditorQuote] = React.useState<
    Partial<IAuditorQuoteRequest>
  >({
    quotation_time: 0,
    quotation_cost: 0,
  });

  const handleAuditorQuoteChange = (key: string, value: string) => {
    setAuditorQuote((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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

  const handleAuditorsSelection = async (decision: 'accept' | 'reject') => {
    try {
      const auditorQuoteRequest: IAuditorQuoteRequest = {
        project_id: Number(projectId),
        quotation_time: auditorQuote.quotation_time ?? 0,
        quotation_cost: auditorQuote.quotation_time ?? 0,
        quote_action: decision,
      };

      await postAuditorQuote(auditorQuoteRequest);
      await handleUpdateProject();
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  return (
    <ShadowCard>
      <Typography variant='h5'>Select auditors quotation</Typography>
      <div className='space-y-4'>
        <Input
          label='Audit time ( days )'
          name='audit_name'
          onChange={(e) =>
            handleAuditorQuoteChange('quotation_time', e.target.value)
          }
          type='number'
          placeholder='Time to audit project (days)'
        />
        <Input
          name='audit_cost'
          label='Audit cost ( $ )'
          onChange={(e) =>
            handleAuditorQuoteChange('quotation_cost', e.target.value)
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
    </ShadowCard>
  );
};

export default AuditorQuotation;
