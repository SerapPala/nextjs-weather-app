import React from "react";
import Page from "./page";
import Head from "next/head";

function Home() {
  return (
      <React.Fragment>
        <Head>
          <title>Türkiye Hava Durumu</title>
        </Head>
        <Page/>
      </React.Fragment>
  );
}
export default Home;
