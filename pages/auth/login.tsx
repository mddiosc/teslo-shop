import { useState } from "react";
import NextLink from "next/link";
import { NextPage } from "next";
import {
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils/";
import { tesloApi } from "../../api/";
import { ErrorOutline } from "@mui/icons-material";

interface LoginPageProps {}

type formData = {
  email: string;
  password: string;
};

const LoginPage: NextPage<LoginPageProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({ email, password }: formData) => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { token, user } = data;
      console.log(
        "🚀 ~ file: login.tsx ~ line 39 ~ onLoginUser ~ token, user",
        { token, user }
      );
    } catch (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);

      console.log(
        "🚀 ~ file: login.tsx ~ line 34 ~ onLoginUser ~ error",
        error
      );
    }

    //TODO: navegar a la pantalla en la que el usuario estaba
  };

  return (
    <AuthLayout title={"Ingresar"}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesión
              </Typography>
              {showError && (
                <Chip
                  label="No reconocemos este usuario / contraseña"
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                  sx={{ mt: 1 }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Este campo es obligatorio",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Este campo es obligatorio",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/register" passHref>
                <Link underline="always">¿No tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
