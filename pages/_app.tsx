import { wrapper } from '../Shared/Redux/Store/store'; 
import { Provider } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import themes from "../Theme/index"; 
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/globals.css';

const muiTheme = createTheme({
  palette: {
    mode: 'light', 
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <ChakraProvider theme={themes}>
          <Component {...pageProps} />
        </ChakraProvider>
      </MuiThemeProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
