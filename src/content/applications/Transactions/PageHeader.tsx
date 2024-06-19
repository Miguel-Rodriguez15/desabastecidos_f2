import { Typography, Grid } from "@mui/material";

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
