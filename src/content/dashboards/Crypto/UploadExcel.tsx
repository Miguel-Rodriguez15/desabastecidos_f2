import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  styled,
  Avatar,
  alpha,
  ListItemAvatar,
} from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import StickyHeadTable from "../../../components/Lists/PreviewUpload";
import EmptyFields from "../../../components/Alerts/EmptyFields";
import SuccesAlerts from "../../../components/Alerts/SuccesAlerts";
import CounterDates from "./CounterDates";
import axiosInstance, { fetchData } from "../../../axios";

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.primary.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.warning};
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
  background: ${theme.palette.mode === "dark"
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
function UploadExcel({ onUploadSuccess }: UploadExcelProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [jsonData, setJsonData] = useState<any[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [serverMessage, setServerMessage] = useState("");
  const [reloadComponent, setReloadComponent] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const Userid = user.id;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop();
      if (fileExtension !== "xlsx") {
        setErrorMessage("Por favor, selecciona un archivo con formato .xlsx");
        return;
      }
      setErrorMessage(null);
      setFile(selectedFile);
      setFileName(selectedFile.name);
      readExcel(selectedFile);
      setReloadComponent(true); // Activar la bandera para recargar el componente
    }
  };
  useEffect(() => {
    if (reloadComponent) {
      // Si la bandera está activa, resetéala
      setReloadComponent(false);
    }
  }, [reloadComponent]);
  const [stats, setStats] = useState({
    dbFiles: 0,
    monthFiles: 0,
    weekFiles: 0,
    todayFiles: 0,
  });
  useEffect(() => {
    if (!file) return;

    const token = localStorage.getItem("token");

    const fetchStats = async () => {
      try {
        const data = await fetchData("/excel");
        const now = new Date();

        const dbFiles = data?.length ?? 0;
        const monthFiles = data?.filter((item: { uploadDate: string | number | Date; }) => {
          const date = new Date(item.uploadDate);
          return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
          );
        }).length ?? 0;

        const weekFiles = data?.filter((item: { uploadDate: string | number | Date; }) => {
          const date = new Date(item.uploadDate);
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(now.getDate() - 7);
          return date >= oneWeekAgo && date <= now;
        }).length ?? 0;

        const todayFiles = data?.filter((item: { uploadDate: string | number | Date; }) => {
          const date = new Date(item.uploadDate);
          return date.toDateString() === now.toDateString();
        }).length ?? 0;

        setStats({
          dbFiles,
          monthFiles,
          weekFiles,
          todayFiles,
        });
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchStats();
  }, [file, reloadComponent]);

  const readExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
        type: "array",
      });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const json: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const headerMap: { [key: string]: string } = {
        "ID MATRIZ DISFARMA": "idMatrizDisfarma",
        "CODIGO DISFARMA": "codigoDisfarma",
        "FECHA INICIO AGOTADO": "fechaInicioAgotado",
        "FECHA FIN AGOTADO": "fechaFinAgotado",
        MOLÉCULA: "molecula",
        CONCENTRACIÓN: "concentracion",
        "FORMA FARMACÉUTICA": "formaFarmaceutica",
        "PRESENTACIÓN COMERCIAL": "presentacionComercial",
        "NOMBRE COMERCIAL": "nombreComercial",
        LABORATORIO: "laboratorio",
        NIT: "nit",
        PROVEEDOR: "proveedor",
        CUM: "cum",
        INVIMA: "invima",
      };

      const headers = json[0];
      const mappedHeaders = headers.map(
        (header: string) => headerMap[header.trim()] || header.trim()
      );

      const rowData = json.slice(1).map((row: any) => {
        const rowObject: { [key: string]: any } = {};
        row.forEach((cell: any, i: number) => {
          const key = mappedHeaders[i];
          rowObject[key] = cell ? String(cell).trim() : "";
        });
        return rowObject;
      });

      const cleanedData = rowData.filter((row) => Object.keys(row).length > 0);

      setJsonData(cleanedData);
      console.log("Datos leídos del archivo Excel:", cleanedData);
    };
    reader.readAsArrayBuffer(file);
  };
  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("No se ha seleccionado ningún archivo.");
      return;
    }

    if (!jsonData) {
      console.error("No hay datos para enviar.");
      return;
    }

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

    const emptyFields = jsonData.filter((obj) =>
      requiredFields.some((field) => !obj[field])
    );

    if (emptyFields.length > 0) {
      const message = "Hay campos requeridos vacíos en los datos del archivo";
      console.error(message);
      setErrorMessage("Hay campos requeridos");
      return;
    }

    try {
      jsonData.forEach((obj) => {
        obj.nombreComercial = obj.nombreComercial || "0";
        obj.cum = obj.cum || "0";
      });
      const token = localStorage.getItem("token");
      const jsonDataWithIdUser = {
        idUser: Userid,
        data: jsonData,
      };

      const response = await axiosInstance.post("/excel", jsonDataWithIdUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setServerMessage(response.data.message);
      onUploadSuccess(response.data);
    } catch (error: any) {
      if (error.response) {
        console.error("Error al cargar el archivo:", error.response.data);
      } else {
        console.error("Error al cargar el archivo:", error.message);
      }
    }
  };

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography variant="h3" gutterBottom>
              Carga en este modulo tu archivo .xlsx
            </Typography>
            <Typography variant="h4" fontWeight="normal" color="text.secondary">
              Para el uso correcto del sistema leer las palabras en rojo
            </Typography>
            <Box display="flex" sx={{ py: 4 }} alignItems="center">
              <AvatarSuccess sx={{ mr: 2 }} variant="rounded">
                <TextSnippetIcon fontSize="large" />
              </AvatarSuccess>
              <Box>
                <Typography color="red" variant="h4">
                  SOLO ARCHIVOS .xlsx
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid sm item>
                <Button
                  fullWidth
                  component="label"
                  role={undefined}
                  variant="contained"
                  color="primary"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon sx={{ color: "white" }} />}
                  sx={{ color: "white" }}>
                  Cargar archivo
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </Button>
                {fileName && (
                  <Typography variant="body1" gutterBottom>
                    Archivo cargado: {fileName}
                  </Typography>
                )}
              </Grid>
              <Grid sm item>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                  sx={{ color: "white" }}>
                  Enviar
                </Button>
              </Grid>
            </Grid>
            {errorMessage && <EmptyFields message={errorMessage} />}
            {serverMessage && <SuccesAlerts message={serverMessage} />}
          </Box>
        </Grid>
        <CounterDates></CounterDates>
      </Grid>
      {jsonData && <StickyHeadTable data={jsonData} />}
    </Card>
  );
}

interface ExcelData {
  idMatrizDisfarma: string;
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

interface UploadExcelProps {
  onUploadSuccess: (data: ExcelData) => void;
}

export default UploadExcel;
