import { SimplePaletteColorOptions, Typography } from '@mui/material';
import React from 'react';

import useTheme from '@/hooks/useTheme';

const PageHeader: React.FC<{ title: string }> = ({ title }) => {
  const theme = useTheme();

  return (
    <Typography
      variant='h3'
      fontWeight='bold'
      color={
        (theme.palette?.secondary as SimplePaletteColorOptions)?.contrastText
      }
    >
      {title}
    </Typography>
  );
};

export default PageHeader;
