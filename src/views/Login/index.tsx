import * as React from "react";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { AuthFormWrapper, FormikTextField } from "../../components";
import { LoginSchema as validationSchema, LoginValues } from "./Login.types";
import { Stack, Link, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLogin } from "../../features/auth/auth-hooks";
import { useAppSelector, useSnackbar } from "../../lib";
import { routes } from "../../lib/routeConfig";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const isLoggedIn = useAppSelector((state) => state.auth?.isLoggedIn);

  const { login, isLoading, isError } = useLogin();
  const { snackbar } = useSnackbar();

  const initialValues = {
    username: "",
    password: "",
  };
  const onSubmit = (values: LoginValues) => {
    login(values);
  };

  React.useEffect(() => {
    const next = searchParams.get("next");

    if (isLoggedIn) {
      snackbar({ message: "Login successful." });
      navigate(next === "/" || !next ? routes.dashboard.index : next);
    }
  }, [navigate, isLoggedIn, searchParams, snackbar]);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const handleShowPassword = () => setShowPassword(!showPassword);

  const PasswordButton = () => (
    <IconButton sx={{ height: "24px", width: "24px" }} onClick={handleShowPassword}>
      {showPassword ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  );

  React.useEffect(() => {
    isError && snackbar({ message: "Invalid email or password.", type: "error" });
  }, [isError, snackbar]);

  return (
    <AuthFormWrapper buttonLabel='Sign In' onSubmit={formik.handleSubmit} disabled={isLoading}>
      <FormikTextField label='Username or Email Address' type='text' name='username' {...formik} />
      <Stack direction='column' alignItems='flex-end' gap={0.5}>
        <FormikTextField
          label='Password'
          type={showPassword ? "text" : "password"}
          name='password'
          InputProps={{
            endAdornment: <PasswordButton />,
          }}
          {...formik}
        />
        <Link to='/forgot-password' component={RouterLink}>
          Forgot Password?
        </Link>
      </Stack>
    </AuthFormWrapper>
  );
};

export default Login;
