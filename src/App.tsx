import ThemeProvider from './theme/ThemeProvider';
import router from './router';
import { useRoutes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <CssBaseline />

      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {content}
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
