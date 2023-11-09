import { Autocomplete, AutocompleteProps } from '@mui/material';
import { TextField } from '@mui/material';
import React, { FC } from 'react';

type AutoCompletePropsType = AutocompleteProps<string, false, false, false>;

const AutoComplete: FC<Partial<AutoCompletePropsType>> = ({ options }) => {
  return (
    <Autocomplete
      disablePortal
      options={options ?? []}
      renderInput={(params) => (
        <TextField {...params} placeholder='Search for auditors' />
      )}
    />
  );
};

export default AutoComplete;
