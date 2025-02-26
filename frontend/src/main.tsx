import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import './index.css'
import customTheme from './theme/config.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useStore from './store/store.ts';
import './assets/fonts/fonts.css';


// const handleError = useStore.getState().handleError;

// const client = new QueryClient();
const client = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: (error) => {
          console.log('Mutation error:', error); // Log para verificar los errores de las mutaciones
          useStore.getState().handleError(error);
        },
      },
    },
  });
ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={client}>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    <ChakraProvider theme={customTheme}>
        <ColorModeScript initialColorMode={customTheme.config?.initialColorMode} />
        <App />
    </ChakraProvider>
    </QueryClientProvider>

)
