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

import Sidebar, { SidebarItem } from "../Shared/Components/Client/SideBarMenu/index"
import { LifeBuoy, Receipt, Boxes, Package, UserCircle,BarChart3, LayoutDashboard, Settings } from 'lucide-react';



function MyApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore({ pageProps });
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
          <Component {...props.pageProps} />
          <Sidebar>
            <SidebarItem
            icon={<LayoutDashboard size={20}/>}
            />
          </Sidebar>
        </ThemeProvider>
      </ChakraProvider>
    </AuthContextProvider>
  </Provider>
  );
}

export default wrapper.withRedux(MyApp);
