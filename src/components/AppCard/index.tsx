import * as React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import * as sx from "./AppCard.styles";
import * as types from "./AppCard.types";
// import { useNavigate } from "react-router-dom";

const AppCard = (props: types.ComponentT) => {
  const { isActive, label, category, description, img, onClick, isInstalled, onInstallApp, id } = props;

  // const navigate = useNavigate();

  return (
    <Box onClick={onClick} sx={isActive ? sx.cardRootActive : sx.cardRoot}>
      <Box sx={sx.imgAndDetailWrapper}>
        <Box sx={sx.imgWrapper}>
          <Box component='img' sx={sx.cardImg} src={img} alt='app_img' />
        </Box>
        <Box>
          <Stack gap={1} direction='column' justifyContent='space-between'>
            <Box>
              <Typography variant='body1' fontWeight={600}>
                {label}
              </Typography>
              <Typography variant='body2'>
                <Box component='span' color='primary.main'>
                  Category:{" "}
                </Box>
                {category}
              </Typography>
            </Box>
            <Box>
              {/* <Button
                onClick={() => navigate(appSlug)}
                sx={sx.openButton}
                size='small'
                variant='outlined'
                color='warning'
              >
                Open
              </Button> */}
              {isInstalled ? (
                <Button
                  onClick={() => onInstallApp(id)}
                  sx={sx.uninstallButton}
                  size='small'
                  variant='outlined'
                >
                  UnInstall
                </Button>
              ) : (
                <Button
                  onClick={() => onInstallApp(id)}
                  sx={sx.installButton}
                  size='small'
                  variant='outlined'
                  color='success'
                >
                  Install
                </Button>
              )}
            </Box>
          </Stack>
        </Box>
      </Box>

      <Typography variant='body2'>{description}</Typography>
    </Box>
  );
};

export default AppCard;
