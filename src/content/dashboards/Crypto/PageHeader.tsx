import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PageHeader() {
  return (
    <Grid container alignItems="center">
      <Grid item></Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Bienvenido
        </Typography>
        <Typography variant="subtitle2">
          Te damos la Bienvenida al sistema de administracion de desabastesidos
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
