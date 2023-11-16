import { Typography } from '@mui/material';
import React from 'react';
import toast from 'react-hot-toast';

import Copy from '@/assets/copy.svg';
import ShadowCard from '@/atoms/ShadowCard';

const ClientFinalPaymentSection = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <ShadowCard>
      <Typography variant='h5'>Partial Payment</Typography>

      <div className=' mt-4 space-y-3'>
        <Typography>Pay at this address:</Typography>

        <Typography>Final Payment: $700</Typography>

        <Typography>
          <div className='flex items-center'>
            <div>0xD6FCD2F85fE975bB9b0f3C1B1c6802bB09d33E43</div>
            <div
              className=' ml-4 cursor-pointer'
              onClick={() =>
                copyToClipboard('0xD6FCD2F85fE975bB9b0f3C1B1c6802bB09d33E43')
              }
            >
              <Copy />
            </div>
          </div>
        </Typography>
      </div>
    </ShadowCard>
  );
};

export default ClientFinalPaymentSection;
