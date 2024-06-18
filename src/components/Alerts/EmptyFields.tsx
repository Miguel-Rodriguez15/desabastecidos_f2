import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

interface EmptyFieldsProps {
  message: string;
}

const EmptyFields: React.FC<EmptyFieldsProps> = ({ message }) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error" onClose={() => {}}>
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </Stack>
  );
};

export default EmptyFields;
