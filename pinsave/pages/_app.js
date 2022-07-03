import Layout from "../components/layout";
import "../styles/globals.css";
import { SkynetClient } from "skynet-js";
import { useStore } from "../store";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const client = new SkynetClient("https://siasky.net");

  return (
    <Layout client={client}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
