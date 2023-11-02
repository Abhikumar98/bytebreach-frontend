import { Typography, useTheme } from '@mui/material';
import React from 'react';

const PageHeader: React.FC<{ title: string }> = ({ title }) => {
  const theme = useTheme();

  return (
    <Typography
      variant='h2'
      fontWeight='medium'
      color={theme.palette.secondary.dark}
    >
      {title}
    </Typography>
  );
};

export default PageHeader;
