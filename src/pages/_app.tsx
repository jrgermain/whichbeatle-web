import "normalize.css";
import "../styles/index.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import GlobalHeader from "../components/global-header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Find info about Beatles songs, listen to your favorites, and discover new ones!"
        />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <GlobalHeader />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
