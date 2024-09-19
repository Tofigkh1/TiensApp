import { wrapper } from '../Shared/Redux/Store/store';
import { Provider } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import themes from "../Theme/index"; 
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/globals.css';
import { ThemeProvider } from "../@/components/my-components/theme/theme-provider/index"
import { AuthContextProvider } from '../Shared/Context';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Spinner from '../public/Spinner@1x-1.0s-200px-200px.gif'




function MyApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore({ pageProps });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  router.events.on('routeChangeStart', () => {
    setLoading(true);
  });

  router.events.on('routeChangeComplete', () => {
    setLoading(false);
  });

  router.events.on('routeChangeError', () => {
    setLoading(false);
  });


  return (
    <Provider store={store}>
    <AuthContextProvider>
      <CssBaseline />
      <ChakraProvider theme={themes}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
           {loading && <}
          <Component {...props.pageProps} />
        </ThemeProvider>
      </ChakraProvider>
    </AuthContextProvider>
  </Provider>
  );
}

export default wrapper.withRedux(MyApp);
