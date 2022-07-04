import Layout from "../components/layout";
import "../styles/globals.css";
import { SkynetClient } from "skynet-js";
import { AppWrapper } from "../context/AppContext";

function MyApp({ Component, pageProps }) {
  const client = new SkynetClient("https://siasky.net");

  return (
    <>
      <AppWrapper>
        <Layout client={client}>
          <Component {...pageProps} />
        </Layout>
      </AppWrapper>
    </>
  );
}

export default MyApp;
