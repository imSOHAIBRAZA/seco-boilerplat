import React from "react";
import { alpha, Box, Chip, useTheme } from "@mui/material";
import { rootStyles } from "../../lib";

export const AlertChip: React.FC<{ label: string }> = ({ label }) => {
  const theme = useTheme();
  return (
    <Chip
      sx={{
        fontWeight: label === "CRITICAL" ? 600 : label === "HIGH" ? 500 : 400,
        background:
          label === "WARNING"
            ? alpha(theme.palette.warning[500] as string, 0.16)
            : label === "LOW"
            ? alpha(theme.palette.success[500] as string, 0.16)
            : label === "MEDIUM"
            ? alpha(theme.palette.warning[500] as string, 0.3)
            : label === "HIGH"
            ? alpha(theme.palette.error[500] as string, 0.16)
            : alpha(theme.palette.error[500] as string, 0.3),
      }}
      label={
        <>
          <Box
            sx={
              label === "WARNING"
                ? rootStyles.warningIndicator
                : label === "CRITICAL"
                ? rootStyles.errorIndicator
                : {
                    ...rootStyles.errorIndicator,
                    backgroundColor:
                      label === "LOW"
                        ? alpha(theme.palette.success[500] as string, 0.8)
                        : label === "MEDIUM"
                        ? theme.palette.warning[500]
                        : alpha(theme.palette.error[500] as string, 0.8),
                  }
            }
          />
          {label}
        </>
      }
    />
  );
};
