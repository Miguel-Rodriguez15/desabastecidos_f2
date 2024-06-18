import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
}

const columns: Column[] = [
  { id: "idMatrizDisfarma", label: "ID MATRIZ DISFARMA" },
  { id: "codigoDisfarma", label: "CODIGO DISFARMA" },
  { id: "fechaInicioAgotado", label: "FECHA INICIO AGOTADO" },
  { id: "fechaFinAgotado", label: "FECHA FIN AGOTADO" },
  { id: "molecula", label: "MOLÉCULA" },
  { id: "concentracion", label: "CONCENTRACIÓN" },
  { id: "formaFarmaceutica", label: "FORMA FARMACÉUTICA" },
  { id: "presentacionComercial", label: "PRESENTACIÓN COMERCIAL" },
  { id: "nombreComercial", label: "NOMBRE COMERCIAL" },
  { id: "laboratorio", label: "LABORATORIO" },
  { id: "nit", label: "NIT" },
  { id: "proveedor", label: "PROVEEDOR" },
  { id: "cum", label: "CUM" },
  { id: "invima", label: "INVIMA" },
];

interface Data {
  [key: string]: any; // Permitir cualquier tipo de clave
}

interface IndexedData extends Data {
  originalIndex: number;
}

interface StickyHeadTableProps {
  data: Data[];
}

export default function StickyHeadTable({ data }: StickyHeadTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const hasError = (row: Data): boolean => {
    const requiredFields = [
      "idMatrizDisfarma",
      "codigoDisfarma",
      "fechaInicioAgotado",
      "fechaFinAgotado",
      "molecula",
      "formaFarmaceutica",
      "presentacionComercial",
      "laboratorio",
      "nit",
      "proveedor",
      "invima",
      "concentracion",
    ];
    return requiredFields.some((field) => !row[field]);
  };

  // Añadir índices originales a las filas
  const indexedData: IndexedData[] = data.map((row, index) => ({
    ...row,
    originalIndex: index,
  }));

  // Ordenar datos por filas con errores primero
  const sortedData = indexedData.sort((a, b) =>
    hasError(a) === hasError(b) ? 0 : hasError(a) ? -1 : 1
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => {
                    const isEmpty = !row[column.id];
                    const isOptionalField = ["nombreComercial", "cum"].includes(
                      column.id
                    );
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align || "left"}
                        style={{
                          color:
                            isEmpty && !isOptionalField ? "red" : "inherit",
                        }}>
                        {row[column.id]}

                        {isEmpty && !isOptionalField && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: "white",
                              backgroundColor: "red",
                              padding: "10px",
                            }}>
                            <WarningAmberIcon />
                            <span
                              style={{
                                marginLeft: "10px",
                                fontWeight: "bold",
                              }}>
                              Campo requerido fila:{row.originalIndex + 2}
                            </span>
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
