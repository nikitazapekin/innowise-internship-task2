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
