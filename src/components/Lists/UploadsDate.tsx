import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DateUpload from './DateUpload';

interface Column {
  id: 'id' | 'uploadDate' | 'user' | 'accion';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  format?: (value: any) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Identificador de archivo', minWidth: 50, align: 'left' },
  {
    id: 'uploadDate',
    label: 'Fecha de cargue',
    minWidth: 170,
    align: 'left',
    format: (value: string) => new Date(value).toLocaleString()
  },
  { id: 'user', label: 'Encargado', minWidth: 170, align: 'left' },
  { id: 'accion', label: 'Acción', minWidth: 170, align: 'left' }
];
interface ApiResponseItem {
  id: number;
  uploadDate: string;
  idUser: {
    username: string;
  };
}

interface Data {
  id: number;
  uploadDate: string;
  user: string; // 'user' es de tipo string, porque guarda solo el username
  accion?: string;
}

const createData = (id: number, uploadDate: string, user: string): Data => {
  return { id, uploadDate, user };
};

export default function UploadsDate() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<Data[]>([]);
  const [showUploadsDate, setShowUploadsDate] = useState(true);
  const [selectedUploadDate, setSelectedUploadDate] = useState<string | null>(
    null
  );

  useEffect(() => {
    // Obtiene el token del almacenamiento local
    const token = localStorage.getItem('token');

    // Verifica si el token está presente
    if (token) {
      // Construye la cabecera de la solicitud con el token
      const headers = {
        Authorization: `Bearer ${token}`
      };

      // Realiza la solicitud fetch con la cabecera de autorización
      fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/excel`, {
        headers: headers
      })
        .then((response) => response.json())
        .then((data: ApiResponseItem[]) => {
          const mappedData = data
            .map((item) => {
              const username = item.idUser
                ? item.idUser.username
                : 'Desconocido';
              return createData(item.id, item.uploadDate, username);
            })
            .reverse();
          setRows(mappedData);

          // Mostrar los datos en la consola
          //console.log('Datos recibidos:', mappedData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      console.error('Token not present. Redirect to login page.');
    }
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewClick = (uploadDate: string) => {
    setSelectedUploadDate(uploadDate);
    setShowUploadsDate(false);
  };

  return (
    <>
      {showUploadsDate && (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        if (column.id === 'accion') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleViewClick(row.uploadDate)}
                                style={{ color: 'white' }}
                              >
                                Ver
                              </Button>
                            </TableCell>
                          );
                        }
                        const value = row[column.id as keyof Data];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value ?? ''}
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
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      {selectedUploadDate && (
        <DateUpload
          uploadDate={selectedUploadDate}
          onBack={() => {
            setSelectedUploadDate(null);
            setShowUploadsDate(true);
          }}
        />
      )}
    </>
  );
}
