"use client";
import type { PaletteOptions } from "@mui/material";
import { alpha } from "@mui/material";
import type { ThemeOptions } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

export interface SimplePaletteColorOptions {
  light?: string;
  main: string;
  dark?: string;
  border?: string;
  medium?: string;
  blue?: string;
}

export interface ShadowOptions {
  light?: string;
}

interface DefaultPaletteOptions extends PaletteOptions {
  primary?: SimplePaletteColorOptions;
  secondary: SimplePaletteColorOptions;
  brand?: SimplePaletteColorOptions;
}

const Default: DefaultPaletteOptions = {
  primary: {
    main: "#49C7E7",
    light: "#EDF9FD",
    medium: "#a4e3f3",
    blue: "#2752E7",
  },
  secondary: {
    main: "#FF9D43",
    dark: "#CC7E36",
    light: "#FFBA79",
    blue: "#00168F",
  },
  grey: {
    900: "#212529",
    800: "#343A40",
    700: "#495057",
    600: "#6C757D",
    500: "#ADB5BD",
    400: "#CED4DA",
    300: "#DEE2E6",
    200: "#E9ECEF",
    100: "#F8F9FA",
  },
  error: {
    main: "#de423f",
    dark: "#e5001a",
    light: "#fba4a2",
  },
  warning: {
    main: "#f9cb2b",
    dark: "#aa6c00",
    light: "#ffe4b7",
  },
  info: {
    main: "#0bdaed",
    dark: "#1F263F",
  },
  success: {
    main: "#06a178",
    dark: "#3c9b09",
    light: "#83d9c2",
  },
  background: {
    default: "#ffffff",
  },
  text: {
    primary: "#1E1E1E",
    secondary: "#ffffff",
  },
};

const lightMode: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "16px",
          lineHeight: "18px",
          height: "48px",
          color: "#ffffff",
          fontWeight: 500,
        },
        sizeSmall: {
          height: "36px",
          lineHeight: "16px",
          paddingInline: "12px",
        },
        sizeMedium: {
          height: "40px",
          paddingInline: "24px",
        },
        sizeLarge: {
          height: "48px",
          paddingInline: "32px",
        },
        outlinedSecondary: {
          borderColor: "#CED4DA",
        },
        contained: {
          backgroundColor: Default.secondary.main,
          "&:hover": {
            backgroundColor: Default.secondary.blue,
            transformOrigin: "left",
            transition: "background-color 0.5s",
          },
          borderRadius: "6px",
        },
        startIcon: {
          marginRight: "6px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
        },
        sizeSmall: {
          fontSize: "13px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
        },
        sizeSmall: {
          width: "24px",
          height: "24px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: "Gantari",
          fontWeight: 500,
          fontSize: "16px",
          height: "60px",
          "& .MuiOutlinedInput-input.MuiInputBase-input": {
            paddingTop: 0,
            paddingBottom: 0,
          },
          "&.Mui-disabled": {
            backgroundColor: `${alpha("#CED4DA", 0.4)} !important`,
          },
          "&.Mui-focused fieldset": {
            borderWidth: "1px !important",
          },
        },
        sizeSmall: {
          height: "40px",
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        transitionDuration: 0,
      },
      styleOverrides: {
        list: {
          padding: "6px",
          paddingTop: "4px",
          "& .MuiMenuItem-root": {
            borderRadius: "6px",
            marginTop: "2px",
            "&:hover": {
              backgroundColor: "#E9ECEF",
            },
          },
        },
      },
    },
    MuiMenuItem: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: "7px 8px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          width: "100%",
          padding: "10px 30px",
          "& .MuiOutlinedInput-input": {
            paddingLeft: 0,
            paddingRight: 0,
          },
          "&:hover": {
            borderColor: "#49C7E7",
          },
        },
        sizeSmall: {
          minHeight: "30px",
        },
        notchedOutline: {
          borderColor: "#49C7E7",
          borderRadius: "6px",
        },
        multiline: {
          borderRadius: "10px",
          minHeight: "50px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: "8px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          borderRadius: "6px !important",
          "&.MuiSelect-root": {
            borderRadius: "6px !important",
          },
        },
      },
    },
  },
  palette: {
    ...Default,
  },
  typography: {
    fontFamily: [
      "inter",
      "outfit",
      "Gantari",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontSize: "20px",
      lineHeight: "26px",
      fontWeight: 500,
      letterSpacing: "-0.24%",
    },
    h2: {
      fontSize: "18px",
      lineHeight: "24px",
      fontWeight: 500,
      letterSpacing: "-0.25%",
    },
    h3: {
      fontSize: "16px",
      lineHeight: "22px",
      fontWeight: 500,
      letterSpacing: "-0.25%",
    },
    h4: {
      fontSize: "15px",
      lineHeight: "20px",
      fontWeight: 500,
      letterSpacing: "-0.24%",
    },
    h5: {
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: 500,
      letterSpacing: "-0.24%",
    },
    h6: {
      fontSize: "12px",
      lineHeight: "18px",
      fontWeight: 500,
      letterSpacing: "-0.24%",
    },
    subtitle1: {
      fontSize: "13px",
      lineHeight: "20px",
      fontWeight: 500,
      letterSpacing: "-0.24%",
    },
    body1: {
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: 400,
      letterSpacing: "-0.24%",
    },
    body2: {
      fontSize: "14px",
      lineHeight: "22px",
      fontFamily: [
        "Gantari",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      fontWeight: 300,
    },
  },
};

const theme = createTheme(lightMode);

export default theme;
