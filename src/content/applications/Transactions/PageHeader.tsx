import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Listados de archivos cargados
        </Typography>
        <Typography variant="subtitle2"></Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
