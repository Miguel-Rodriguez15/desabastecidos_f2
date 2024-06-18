import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import { Container, Grid } from '@mui/material';

import UploadExcel from './UploadExcel';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import Footer from '../../../components/Footer';

function DashboardCrypto() {
  const handleUploadSuccess = () => {
    // Manejar la lógica de éxito aquí
    // console.log('Upload successful:', data);
  };
  return (
    <>
      <Helmet></Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <UploadExcel onUploadSuccess={handleUploadSuccess} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto;
