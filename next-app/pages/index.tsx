import type { NextPage } from "next";
import Head from "next/head";
import { SkynetClient } from "skynet-js";

const Home: NextPage = () => {
  const portal =
    window.location.hostname === "localhost" ? "https://siasky.net" : undefined;

  const client = new SkynetClient(portal);
  return (
    <>
      <Head>
        <title> Pin Save</title>
        <meta name="description" content="Dapp" />
        <link rel="icon" href="/assets/images/Pin.png" />
      </Head>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
};

export default Home;
