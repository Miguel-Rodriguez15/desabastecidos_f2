import * as React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface ResultSearchProps {
  nombreComercial: string;
  molecula: string;
  concentracion: string;
  fechaInicioAgotado: String;
  fechaFinAgotado: String;
}

const ResultSearch: React.FC<ResultSearchProps> = ({
  nombreComercial,
  molecula,
  concentracion,
  fechaInicioAgotado,
  fechaFinAgotado,
}) => {
  return (
    <Box
      sx={{ minWidth: 275, padding: 2 }}
      style={{ textAlign: "center", margin: "auto" }}>
      <CardContent>
        <img
          src="/static/images/pharmaser/logoPharmaser.png"
          width={230}
          alt="Logo"
        />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Información del Medicamento
        </Typography>
        <Typography variant="h5" component="div">
          {molecula}
        </Typography>
        <Typography color="text.secondary">
          Concentración: {concentracion}
        </Typography>
        <Typography variant="body2">
          Nombre Comercial: {nombreComercial}
        </Typography>
        <Typography
          variant="h4"
          style={{
            fontWeight: "bold",
            color: "red",
            textTransform: "uppercase",
          }}>
          Su medicamente no se encontrara disponible entre: {fechaInicioAgotado}{" "}
          y {fechaFinAgotado}
        </Typography>
      </CardContent>
    </Box>
  );
};

export default ResultSearch;
