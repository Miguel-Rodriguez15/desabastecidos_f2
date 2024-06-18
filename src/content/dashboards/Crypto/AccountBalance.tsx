import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar
} from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import Text from './components/Text';
import type { ApexOptions } from 'apexcharts';
import * as React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { pink, red } from '@mui/material/colors';
const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
    };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);

function AccountBalance() {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: ['#ff9900', '#1c81c2', '#333', '#5c6ac0'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },

    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const chartSeries = [10, 20, 25, 45];

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  });
  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            {/* <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Carga en este modulo tu archivo .xlsx{' '}
            </Typography> */}
            <Box>
              <Typography variant="h3" gutterBottom>
                Carga en este modulo tu archivo .xlsx{' '}
              </Typography>
              <Typography
                variant="h4"
                fontWeight="normal"
                color="text.secondary"
              >
                Para el uso correcto del sistema leer las palabras en rojo
              </Typography>
              <Box
                display="flex"
                sx={{
                  py: 4
                }}
                alignItems="center"
              >
                <AvatarSuccess
                  sx={{
                    mr: 2
                  }}
                  variant="rounded"
                >
                  <TextSnippetIcon fontSize="large" />
                </AvatarSuccess>
                <Box>
                  <Typography color="red" variant="h4">
                    SOLO ARCHIVOS .xlsx
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid sm item>
                <Button
                  fullWidth
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Cargar archivo
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Grid>
              <Grid sm item>
                <Button fullWidth variant="contained">
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          sx={{
            position: 'relative'
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={6}
        >
          <Box
            component="span"
            sx={{
              display: { xs: 'none', md: 'inline-block' }
            }}
          >
            <Divider absolute orientation="vertical" />
          </Box>
          <Box py={4} pr={4} pl={4} flex={1}>
            <Grid container spacing={-2}>
              <List
                disablePadding
                sx={{
                  width: '100%'
                }}
              >
                <ListItem disableGutters>
                  <ListItemAvatarWrapper>
                    <CalendarMonthIcon
                      fontSize="large"
                      sx={{ color: red[500] }}
                    ></CalendarMonthIcon>
                  </ListItemAvatarWrapper>
                  <ListItemText
                    primary="Archivos en Base de datos"
                    primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                  />
                  <Box>
                    <Typography align="right" variant="h4" noWrap>
                      20%
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem disableGutters>
                  <ListItemAvatarWrapper>
                    <CalendarMonthIcon
                      fontSize="large"
                      sx={{ color: red[500] }}
                    ></CalendarMonthIcon>
                  </ListItemAvatarWrapper>
                  <ListItemText
                    primary="Archivos en el mes"
                    primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                  />
                  <Box>
                    <Typography align="right" variant="h4" noWrap>
                      10%
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem disableGutters>
                  <ListItemAvatarWrapper>
                    <CalendarMonthIcon
                      fontSize="large"
                      sx={{ color: red[500] }}
                    ></CalendarMonthIcon>
                  </ListItemAvatarWrapper>
                  <ListItemText
                    primary="Archivos en la semana"
                    primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                  />
                  <Box>
                    <Typography align="right" variant="h4" noWrap>
                      40%
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem disableGutters>
                  <ListItemAvatarWrapper>
                    <CalendarMonthIcon
                      fontSize="large"
                      sx={{ color: red[500] }}
                    ></CalendarMonthIcon>
                  </ListItemAvatarWrapper>
                  <ListItemText
                    primary="Archivos cargados hoy"
                    primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                  />
                  <Box>
                    <Typography align="right" variant="h4" noWrap>
                      30%
                    </Typography>
                  </Box>
                </ListItem>
              </List>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default AccountBalance;
