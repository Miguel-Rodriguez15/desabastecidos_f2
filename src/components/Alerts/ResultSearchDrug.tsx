import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

interface ResultSearchDrugProps {
  message: string;
}
const ResultSearchDrug: React.FC<ResultSearchDrugProps> = ({ message }) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning">
        <AlertTitle>Aviso</AlertTitle>
        {message}
      </Alert>
    </Stack>
  );
};
export default ResultSearchDrug;
