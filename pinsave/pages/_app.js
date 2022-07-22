import Layout from "../components/layout";
import "../styles/globals.css";

import { AppWrapper } from "../context/AppContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppWrapper>
    </>
  );
}

export default MyApp;
