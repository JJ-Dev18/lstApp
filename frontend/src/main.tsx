
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import './index.css'
import customTheme from './theme/config.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={client}>
    <ReactQueryDevtools initialIsOpen={false} />
    <ChakraProvider theme={customTheme}>
        <ColorModeScript initialColorMode={customTheme.config?.initialColorMode} />
        <App />
    </ChakraProvider>
    </QueryClientProvider>

)
