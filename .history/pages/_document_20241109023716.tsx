import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="../public/favicon.ico" />
          <meta property="og:image" content="../public/favicon.ico" />
          <meta name="twitter:image" content="../public/favicon.ico" />
          <title>Doctor</title>
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