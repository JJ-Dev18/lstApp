
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import './index.css'
import customTheme from './theme/config.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChakraProvider theme={customTheme}>
        <ColorModeScript initialColorMode={customTheme.config?.initialColorMode} />
        <App />
    </ChakraProvider>

)
