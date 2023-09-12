import * as React from "react";
import { Box, Typography, Button } from "@mui/material";

import SideImg from "../../assets/error.jpg";

const ErrorCard: React.FC<{
  onClick: () => void;
  title: string;
  subTitle: string;
  description: string;
  buttonText: string;
}> = ({ onClick, title, subTitle, description, buttonText }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: { md: 5, xs: 0 },
        px: 4,
      }}
    >
      <Box
        component='img'
        sx={{ width: "100%", maxWidth: "425px", alignSelf: "center", px: { md: 0, xs: 2 } }}
        src={SideImg}
      />
      <Box>
        <Typography
          fontWeight={600}
          sx={{
            textShadow: "2px 2px 10px #FFF",
            fontSize: "80px",
            textAlign: "left",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant='h6'
          sx={{
            textAlign: "left",
            fontWeight: 600,
            fontFamily: "Inter, sans-serif",
          }}
        >
          {subTitle}
        </Typography>

        <Typography sx={{ textAlign: "left", fontFamily: "Inter, sans-serif" }} variant='body1'>
          {description}
        </Typography>
        <Button
          sx={{ mt: 2, fontFamily: "Inter, sans-serif" }}
          color='primary'
          variant='contained'
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorCard;
