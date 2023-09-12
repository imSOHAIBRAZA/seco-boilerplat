import * as React from "react";
import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as types from "./AuthFormWrapper.types";
import * as sx from "./AuthFormWrapper.styles";
import { useAppSelector } from "../../lib";

const AuthFormWrapper = ({ children, onSubmit, disabled, buttonLabel }: types.ComponentT) => {
  const navLogo = useAppSelector((state) => state.config.ui.images.navLogo);

  const title = useAppSelector((state) => state.config.ui.meta.title);

  return (
    <Box sx={sx.authFormWrapper}>
      <Box sx={sx.formHeader}>
        <Box component='img' src={navLogo} alt='logo' />
      </Box>
      <Box sx={sx.appTitleWrapper}>
        <Typography variant='body1'>{title}</Typography>
      </Box>
      <Box component='form' onSubmit={onSubmit} sx={sx.formWrapper}>
        {children}
        <LoadingButton loading={disabled} fullWidth variant='contained' size='medium' type='submit'>
          {buttonLabel || "Continue"}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default AuthFormWrapper;
