import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Next One time password sample</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="this is sample site." />
        <meta name="format-detection" content="telephone=no,address=no,email=no" />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
