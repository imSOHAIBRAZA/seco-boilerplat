import { alpha, createTheme, Theme } from "@mui/material";
import { initialUIConfig } from "./config";

declare module "@mui/material/styles/createPalette" {
  // eslint-disable-next-line
  interface PaletteColor extends ColorPartial {}
}

// A custom theme for this app
const theme: Theme = createTheme({
  palette: {
    primary: {
      contrastText: "#FFFFFF",
      main: initialUIConfig.theme.primaryColor,
      100: "#DEF0FD",
      800: "#274C7E",
      900: "#2F3743",
    },
    secondary: {
      100: "#AFB5C0",
      main: "#19857b",
      900: "#1C1B1F",
    },
    error: {
      100: "#FCE8E8",
      main: "#9D2121",
      500: "#9D2121",
      600: "#E61A26",
    },
    common: {
      black: "#000",
      white: "#DBDBDB",
    },
    success: {
      main: "#219D5A",
      500: "#219D5A",
    },
    warning: {
      main: "#FF9500",
      500: "#FF9500",
    },
    grey: {
      900: "#222222",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
});

theme.components = {
  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: { borderColor: "#005A9E4D", borderRadius: "8px" },
    },
  },
  MuiTextField: {
    defaultProps: { size: "small" },
    styleOverrides: {
      root: {
        "& .MuiInputBase-root": { height: "3.25rem" },
        "& .MuiInputBase-input": {
          paddingTop: 0,
          paddingBottom: 0,
          height: "100%",
        },
      },
    },
    variants: [
      {
        props: { size: "small" },
        style: {
          "& .MuiInputLabel-root": {
            transform: "translate(14px, 9px) scale(1)",
          },
          "& .MuiInputLabel-root[data-shrink=true]": {
            transform: "translate(14px, -9px) scale(0.75)",
          },
          "& .MuiInputBase-root": { height: "2.75rem" },
        },
      },
    ],
  },
  MuiChip: {
    styleOverrides: {
      root: ({ ownerState }) => {
        return {
          color: "#222",
          // @ts-ignore
          background: alpha(theme.palette[ownerState?.color || "success"]?.main || "#000", 0.16),
          "& .MuiChip-label": {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "4px",
          },
        };
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        padding: "0 1rem",
        height: "2.75rem",
        fontSize: "0.875rem",
        fontWeight: 600,
        whiteSpace: "nowrap",
        [theme.breakpoints.down("md")]: {
          padding: "0 0.75rem",
          height: "2.5rem",
          fontSize: "0.75rem",
        },
      },
    },
    variants: [
      {
        props: { size: "small" },
        style: {
          height: "2.5rem",
          [theme.breakpoints.down("md")]: {
            height: "2.25rem",
          },
        },
      },
    ],
  },
  MuiTab: {
    styleOverrides: {
      root: {
        fontSize: "20px",
        fontWeight: 400,
        textTransform: "none",
        paddingLeft: 0,
        paddingRight: 0,
        paddingBotton: "1rem",
        marginRight: "28px",
        "&.Mui-selected": { fontWeight: 600, color: theme.palette.primary[800] },
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        "& .MuiTabs-indicator": { backgroundColor: theme.palette.primary[800] },
        "& .MuiTabScrollButton-horizontal": { width: "auto" },
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        padding: "2rem",
        [theme.breakpoints.down("md")]: {
          padding: "1.5rem",
        },
        "&.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded": {
          border: "none !important",
          borderBottom: "1px solid #CBCBCB !important",
        },
        "&.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded:last-of-type": {
          borderBottom: "none !important",
        },

        "&.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded ": {
          boxShadow: "none !important",
          borderRadius: "0 !important",
        },
        "& .MuiAccordionSummary-expandIconWrapper": {
          color: "#1C1B1F",
        },
        "&.Mui-expanded": {
          margin: 0,
          border: "none",
        },
        "&::before": { display: "none" },
        "& .Mui-focusVisible": { backgroundColor: "#FFF !important" },
        "& .MuiAccordionSummary-root": { padding: 0 },
        "& .MuiAccordionSummary-content": { margin: 0, marginRight: "20px", width: "100%" },
        "& .MuiAccordionSummary-content.Mui-expanded": { margin: 0, marginRight: "20px" },
        "& .MuiAccordionDetails-root": { padding: 0, marginTop: "1.75rem" },
      },
    },
  },
};

export default theme;
