import { Theme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    colors: Record<string, string>;
    fonts: Record<string, string>;
    fontSizes: Record<string, number>;
    containers: Record<string, number>;
    breakpoint: Record<string, number>;
    fontFamilies: Record<string, string>;
    spaces: Record<string, string>;
  }

  interface ThemeOptions {
    colors?: Record<string, string>;
    fonts?: Record<string, string>;
    fontSizes?: Record<string, number>;
    containers?: Record<string, number>;
    breakpoint?: Record<string, number>;
    fontFamilies?: Record<string, string>;
    spaces?: Record<string, number>;
  }
}

/*   interface Theme {
    status: {
      danger: string;
      success: string;
    };
    spacingValues: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    sizes: {
      button: {
        xs: { height: number; padding: string };
        sm: { height: number; padding: string };
        md: { height: number; padding: string };
        lg: { height: number; padding: string };
      };
      input: {
        xs: { height: number };
        sm: { height: number };
        md: { height: number };
        lg: { height: number };
      };
      container: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
    };
  }
  
  interface ThemeOptions {
    status?: {
      danger?: string;
      success?: string;
    };
    spacingValues?: {
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
      xxl?: number;
    };
    sizes?: {
      button?: {
        xs?: { height: number; padding: string };
        sm?: { height: number; padding: string };
        md?: { height: number; padding: string };
        lg?: { height: number; padding: string };
      };
      input?: {
        xs?: { height: number };
        sm?: { height: number };
        md?: { height: number };
        lg?: { height: number };
      };
      container?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };
    };
  } */

/* declare module '@mui/material/Alert' {
  interface AlertPropsColorOverrides {
    success: true;
  }
} */
