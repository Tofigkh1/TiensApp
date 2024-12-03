import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" sizes="180x180" href="/Logo.png" />
          <link rel="apple-touch-icon" sizes="192x192" href="/Logo.png" />
          <link rel="apple-touch-icon" sizes="512x512" href="/Logo.png" />
          <link rel="apple-touch-startup-image" href="/splashscreens/splash-828x1792.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)">

          <link rel="icon" href="/favicon.ico" />
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta property="og:image" content="/Logo.png" />
          <meta name="description" content="doctor-tibet.com" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;