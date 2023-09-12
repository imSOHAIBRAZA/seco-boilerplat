import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import { AuthFormWrapper, FormikTextField } from "../../components";
import { RegisterSchema as validationSchema, RegisterValues } from "./Signup.types";
import { Stack, Link } from "@mui/material";
import type { SignupProps } from "./Signup.types";
import { PasswordButton } from "./Signup.components";

const Signup: SignupProps = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const onSubmit = (values: RegisterValues) => {
    console.log("*** ", values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <AuthFormWrapper
      buttonLabel='Sign Up'
      onSubmit={formik.handleSubmit}
      disabled={formik.isSubmitting}
    >
      <FormikTextField label='Email' type='text' name='email' {...formik} />
      <FormikTextField
        label='Password'
        type={showPassword ? "text" : "password"}
        name='password'
        InputProps={{
          endAdornment: <PasswordButton isPassword={showPassword} onClick={handleShowPassword} />,
        }}
        {...formik}
      />
      <Stack direction='column' alignItems='flex-end' gap={0.5}>
        <FormikTextField
          label='Confirm Password'
          type={showConfirmPassword ? "text" : "password"}
          name='confirmPassword'
          InputProps={{
            endAdornment: (
              <PasswordButton
                isPassword={showConfirmPassword}
                onClick={handleShowConfirmPassword}
              />
            ),
          }}
          {...formik}
        />
        <Link to='/login' component={RouterLink}>
          Already Have an Account?
        </Link>
      </Stack>
    </AuthFormWrapper>
  );
};

export default Signup;
