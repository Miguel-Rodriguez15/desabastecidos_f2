import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface SuccessAlertProps {
  message: string;
}

const SuccessAlerts: React.FC<SuccessAlertProps> = ({ message }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar(message, {
      variant: 'success',
      persist: true,
      action: (key) => (
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => closeSnackbar(key)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )
    });
  };

  useEffect(() => {
    handleClick();
  }, []);

  return null; // No necesitas devolver nada, ya que las notificaciones son manejadas globalmente
};

export default SuccessAlerts;
