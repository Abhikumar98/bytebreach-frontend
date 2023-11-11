import { Autocomplete, AutocompleteProps } from '@mui/material';
import { TextField } from '@mui/material';
import React from 'react';

type AutoCompletePropsType<T> = AutocompleteProps<T, false, false, false>;

const AutoComplete = <T,>({
  options,
  ...props
}: Partial<AutoCompletePropsType<T>>) => {
  return (
    <Autocomplete
      disablePortal
      options={options ?? []}
      renderInput={(params) => (
        <TextField {...params} placeholder='Search for auditors' />
      )}
      {...props}
    />
  );
};

export default AutoComplete;
