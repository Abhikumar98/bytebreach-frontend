import { ThemeOptions, useTheme as useMaterialTheme } from '@mui/material';

const useTheme = () => {
  const theme = useMaterialTheme<ThemeOptions>();

  return theme;
};

export default useTheme;
