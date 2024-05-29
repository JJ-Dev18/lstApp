// theme.js
import { extendTheme, ThemeConfig, ThemeOverride } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode("white", "#121721")(props),
      color: mode("black", "white")(props),
    },
  }),
};

const components = {
  Select: {
    baseStyle: (props: StyleFunctionProps) => ({
      field: {
        bg: mode("gray.200", "#1E2430")(props),
        borderColor: mode("gray.300", "#1E2430")(props),
        color: mode("black", "white")(props),
        _hover: {
          borderColor: mode("gray.400", "#2D3748")(props),
        },
        _focus: {
          borderColor: mode("gray.400", "#2D3748")(props),
          boxShadow: "none",
        },
      },
    }),
    sizes: {
      md: {
        field: {
          h: "48px",
          fontSize: "lg",
        },
      },
    },
    variants: {
      filled: (props: StyleFunctionProps) => ({
        field: {
          bg: mode("gray.200", "#1E2430")(props),
          _hover: {
            bg: mode("gray.300", "#2D3748")(props),
          },
          _focus: {
            bg: mode("gray.300", "#2D3748")(props),
            borderColor: mode("gray.400", "#2D3748")(props),
          },
        },
      }),
    },
  },
  Button: {
    baseStyle: {
      fontWeight: "bold",
      borderRadius: "md",
    },
    sizes: {
      md: {
        h: "48px",
        fontSize: "lg",
        px: "32px",
      },
    },
    variants: {
      solid: (props: StyleFunctionProps) => ({
        bg: mode("blue.500", "#2563EB")(props),
        color: "white",
        _hover: {
          bg: mode("blue.600", "#1E40AF")(props),
        },
        _active: {
          bg: mode("blue.700", "#1E3A8A")(props),
        },
      }),
      outline: (props: StyleFunctionProps) => ({
        bg: "transparent",
        borderColor: mode("blue.700", "blue.700")(props),
        color: mode("black", "white")(props),
        _hover: {
          bg: mode("gray.100", "#2D3748")(props),
        },
        _active: {
          bg: mode("gray.200", "#1E3A8A")(props),
        },
      }),
    },
  },
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme: ThemeOverride = extendTheme({ styles, components, config });

export default theme;
