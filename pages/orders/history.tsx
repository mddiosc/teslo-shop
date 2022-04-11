import { Chip, Grid, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { NextPage } from "next";
import ShopLayout from "../../components/layouts/ShopLayout";

interface HistoryPageProps {}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "fullname",
    headerName: "Nombre Completo",
    width: 300,
  },
  {
    field: "paid",
    headerName: "Paid",
    description: "Muestra información si la orden está pagada",
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      );
    },
  },
  {
    field: "order",
    headerName: "Ver Orden",
    sortable: false,
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return (
        params.row.paid && (
          <NextLink href={`/orders/${params.row.id}`} passHref>
            <Link underline="always">Ver Orden</Link>
          </NextLink>
        )
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullname: "Juan Perez" },
  { id: 2, paid: false, fullname: "Pepito de los Palotes" },
  { id: 3, paid: true, fullname: "Hernan Cortés" },
  { id: 4, paid: false, fullname: "Jose García" },
  { id: 5, paid: true, fullname: "María del Rio" },
  { id: 6, paid: true, fullname: "Natalia Jimenez" },
];

const HistoryPage: NextPage<HistoryPageProps> = () => {
  return (
    <ShopLayout
      title={"Historial de Ordenes"}
      pageDescription={"Historial de ordenes del cliente"}
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
