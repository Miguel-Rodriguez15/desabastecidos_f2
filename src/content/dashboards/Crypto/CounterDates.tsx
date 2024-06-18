import { useEffect, useState } from "react";
import {
  ListItemText,
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  Grid,
  Box,
  Typography,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { fetchData } from "../../../axios";
export default function CounterDates() {
  const [stats, setStats] = useState({
    dbFiles: 0,
    monthFiles: 0,
    weekFiles: 0,
    todayFiles: 0,
  });
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchStats = async () => {
      const data = await fetchData("/excel");
      const now = new Date();

      const dbFiles = data?.length ?? 0;
      const monthFiles = data?.filter((item) => {
        const date = new Date(item.uploadDate);
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      }).length ?? 0;

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      const weekFiles = data?.filter((item) => {
        const date = new Date(item.uploadDate);
        return date >= oneWeekAgo && date <= now;
      }).length ?? 0;

      const todayFiles = data?.filter((item) => {
        const date = new Date(item.uploadDate);
        return date.toDateString() === now.toDateString();
      }).length ?? 0;

      setStats({
        dbFiles,
        monthFiles,
        weekFiles,
        todayFiles,
      });
    };

    fetchStats();
  }, []);

  return (
    <Grid
      sx={{ position: "relative" }}
      display="flex"
      alignItems="center"
      item
      xs={12}
      md={6}>
      <Box
        component="span"
        sx={{ display: { xs: "none", md: "inline-block" } }}>
        <Divider absolute orientation="vertical" />
      </Box>
      <Box py={4} pr={4} pl={4} flex={1}>
        <Grid container spacing={-2}>
          <List disablePadding sx={{ width: "100%" }}>
            <ListItem disableGutters>
              <ListItemAvatar>
                <CalendarMonthIcon fontSize="large" sx={{ color: "#146ca7" }} />
              </ListItemAvatar>
              <ListItemText
                primary="Archivos en Base de datos"
                primaryTypographyProps={{ variant: "h5", noWrap: true }}
              />
              <Box>
                <Typography align="right" variant="h4" color="primary" noWrap>
                  {stats.dbFiles}
                </Typography>
              </Box>
            </ListItem>
            <ListItem disableGutters>
              <ListItemAvatar>
                <CalendarMonthIcon fontSize="large" sx={{ color: "#146ca7" }} />
              </ListItemAvatar>
              <ListItemText
                primary="Archivos en el mes"
                primaryTypographyProps={{ variant: "h5", noWrap: true }}
              />
              <Box>
                <Typography align="right" variant="h4" color="primary" noWrap>
                  {" "}
                  {stats.monthFiles}
                </Typography>
              </Box>
            </ListItem>
            <ListItem disableGutters>
              <ListItemAvatar>
                <CalendarMonthIcon fontSize="large" sx={{ color: "#146ca7" }} />
              </ListItemAvatar>
              <ListItemText
                primary="Archivos en la semana"
                primaryTypographyProps={{ variant: "h5", noWrap: true }}
              />
              <Box>
                <Typography align="right" variant="h4" color="primary" noWrap>
                  {stats.weekFiles}
                </Typography>
              </Box>
            </ListItem>
            <ListItem disableGutters>
              <ListItemAvatar>
                <CalendarMonthIcon fontSize="large" sx={{ color: "#146ca7" }} />
              </ListItemAvatar>
              <ListItemText
                primary="Archivos cargados hoy"
                primaryTypographyProps={{ variant: "h5", noWrap: true }}
              />
              <Box>
                <Typography align="right" variant="h4" color="primary" noWrap>
                  {stats.todayFiles}
                </Typography>
              </Box>
            </ListItem>
          </List>
        </Grid>
      </Box>
    </Grid>
  );
}
