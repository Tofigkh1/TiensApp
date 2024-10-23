import { NextIntlProvider } from 'next-intl';

function MyApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore({ pageProps });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);
    const handleRouteChangeError = () => setLoading(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);

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
            {loading && (
              <div className="spinner-overlay">
                <DotLoader color="#28e4c5" speedMultiplier={1.6} size={90} />
              </div>
            )}
            <NextIntlProvider messages={pageProps.messages}>
              <Component {...props.pageProps} />
            </NextIntlProvider>
          </ThemeProvider>
        </ChakraProvider>
      </AuthContextProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
