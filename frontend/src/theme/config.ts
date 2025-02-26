import {  extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: (props: any) => ({
    body: {
      bg: mode('gray.100', 'gray.900')(props),
      color: mode('gray.800', 'whiteAlpha.900')(props),
    },
    a: {
      color: mode('teal.600', 'teal.300')(props),
      _hover: {
        textDecoration: 'underline',
      },
    },
  }),
};

const colors = {
  brand: {
    50: '#f5f7ff',
    100: '#e4e9ff',
    200: '#c9ccff',
    300: '#a7aaff',
    400: '#7f7fff',
    500: '#a7aaff',
    600: '#4a4acc',
    700: '#3b3b99',
    800: '#2c2c66',
    900: '#1e1e40',
  },
  custom: {
    brightGreen: '#16F98A',
    brightRed : '#DC0031'
  },
};

const components = {
  
  Link: {
    baseStyle: (props: any) => ({
      color: mode('teal.400', 'teal.300')(props),
      textDecoration: 'none',
      _hover: {
        textDecoration: 'none',
        color: mode('white', 'white')(props),
        background: mode('teal.700', 'teal.400')(props),
      },
    }),
  },
  Button: {
    baseStyle: {
      _focus: {
        boxShadow: 'none',
      },
    },
    variants: {
      solid: (props: any) => ({
        bg: mode('custom.brightGreen', 'white')(props),
        color: mode('white', 'gray.800')(props),
        _hover: {
          bg: mode('custom.brightGreen', 'custom.brightGreen')(props),
          color: mode('white', 'black')(props),

        },
      }),
      ghost: (props: any) => ({
        bg: mode('transparent', 'transparent')(props),
        color: mode('gray.800', 'whiteAlpha.900')(props),
        _hover: {
          bg: mode('gray.200', 'custom.brightRed')(props),
        },
      }),
    },
  },
  Card: {
    baseStyle: (props: any) => ({
      bg: mode('gray.100', 'gray.800')(props),
      color: mode('gray.800', 'whiteAlpha.900')(props),
      boxShadow: 'lg',
      borderRadius: 'md',
    }),
  },
  Heading: {
    baseStyle: (props: any) => ({
      color: mode('gray.800', 'whiteAlpha.900')(props),
    }),
  },
  Text: {
    baseStyle: (props: any) => ({
      color: mode('gray.600', 'gray.400')(props),
    }),
  },
  Box: {
    baseStyle: (props: any) => ({
      bg: mode('gray.100', 'gray.900')(props),
      color: mode('gray.800', 'whiteAlpha.900')(props),
    }),
  },
};

const customTheme = extendTheme({
  config,
  styles,
  colors,
  components,
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
  },
});

export default customTheme;
