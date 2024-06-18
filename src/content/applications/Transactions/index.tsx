import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import { Grid, Container } from '@mui/material';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import UploadsDate from '../../../components/Lists/UploadsDate';
import Footer from '../../../components/Footer';

function ApplicationsTransactions() {
  return (
    <>
      <Helmet>
        <title>Listado de cargues</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <UploadsDate></UploadsDate>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
