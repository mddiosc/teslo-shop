import NextLink from 'next/link';
import { NextPage } from "next";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../components/layouts";

interface RegisterPageProps {}

const RegisterPage: NextPage<RegisterPageProps> = () => {
  return (
    <AuthLayout title={"Ingresar"}>
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Crear Cuenta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Nombre Completo" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Correo" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Crear Cuenta
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="end">
            <NextLink href="/auth/login" passHref>
              <Link underline="always">¿Ya tienes cuenta?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
