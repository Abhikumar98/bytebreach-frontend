import { Color, Typography } from '@mui/material';
import React from 'react';

import useTheme from '@/hooks/useTheme';

const PageHeader: React.FC<{ title: string }> = ({ title }) => {
  const theme = useTheme();

  console.log({ color: theme.palette?.secondary as Color[800] });

  return (
    <Typography
      variant='h2'
      fontWeight='medium'
      color={(theme.palette?.secondary as Color)[800]}
    >
      {title}
    </Typography>
  );
};

export default PageHeader;
