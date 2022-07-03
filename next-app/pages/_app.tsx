import type { AppProps } from "next/app";
//import App from "next/app";
import Layout from "../components/layout";
import "../styles/globals.css";
//import initContract from "../components/helpers/initsapp";

export default function MyApp({ Component, pageProps }: AppProps) {
  /*   contract: any,
  currentUser: any,
  nearConfig: any,
  walletConnection: any,
  didContract: any */
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

/* MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  const { contract, currentUser, nearConfig, walletConnection, didContract } =
    await initContract();
  return {
    ...appProps,
    contract,
    currentUser,
    nearConfig,
    walletConnection,
    didContract,
  };
}; */
