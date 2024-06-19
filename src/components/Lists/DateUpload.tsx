import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { fetchData } from "../../axios";
interface Column {
  id: keyof Data;
  label: string;
  minWidth?: number;
  align?: "right" | "left";
}

const columns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 50, align: "left" },
  {
    id: "idMatrizDisfarma",
    label: "ID Matriz Disfarma",
    minWidth: 170,
    align: "left",
  },
  {
    id: "codigoDisfarma",
    label: "Código Disfarma",
    minWidth: 170,
    align: "left",
  },
  {
    id: "fechaInicioAgotado",
    label: "Fecha Inicio Agotado",
    minWidth: 170,
    align: "left",
  },
  {
    id: "fechaFinAgotado",
    label: "Fecha Fin Agotado",
    minWidth: 170,
    align: "left",
  },
  { id: "molecula", label: "Molécula", minWidth: 170, align: "left" },
  { id: "concentracion", label: "Concentración", minWidth: 170, align: "left" },
  {
    id: "formaFarmaceutica",
    label: "Forma Farmacéutica",
    minWidth: 170,
    align: "left",
  },
  {
    id: "presentacionComercial",
    label: "Presentación Comercial",
    minWidth: 170,
    align: "left",
  },
  {
    id: "nombreComercial",
    label: "Nombre Comercial",
    minWidth: 170,
    align: "left",
  },
  { id: "laboratorio", label: "Laboratorio", minWidth: 170, align: "left" },
  { id: "nit", label: "NIT", minWidth: 170, align: "left" },
  { id: "proveedor", label: "Proveedor", minWidth: 170, align: "left" },
  { id: "cum", label: "CUM", minWidth: 170, align: "left" },
  { id: "invima", label: "INVIMA", minWidth: 170, align: "left" },
];

interface Data {
  id: number;
  idMatrizDisfarma: number;
  codigoDisfarma: string;
  fechaInicioAgotado: string;
  fechaFinAgotado: string;
  molecula: string;
  concentracion: string;
  formaFarmaceutica: string;
  presentacionComercial: string;
  nombreComercial: string;
  laboratorio: string;
  nit: string;
  proveedor: string;
  cum: string;
  invima: string;
}

interface DateUploadProps {
  uploadDate: string;
  onBack: () => void;
}

const DateUpload: React.FC<DateUploadProps> = ({ uploadDate, onBack }) => {
  const [data, setData] = React.useState<Data[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const endpoint = `/excel/by-upload-date?uploadDate=${uploadDate}`;
        const responseData = await fetchData(endpoint);
        const mergedData = responseData?.reduce(
          (accumulator: string | any[], currentObject: { data: any }) =>
            accumulator.concat(currentObject.data),
          []
        );
        setData(mergedData ?? []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromAPI();
  }, [uploadDate]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={12} md={11} lg={11} xl={12}>
        <Paper sx={{ width: "100%", overflow: "auto" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0 ? (
                  data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, rowIndex) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={rowIndex}>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align || "left"}>
                            {row[column.id]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      No hay datos disponibles
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 16px",
            }}>
            <Button
              variant="contained"
              onClick={onBack}
              style={{ color: "white" }}>
              Regresar
            </Button>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DateUpload;
