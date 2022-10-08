import type { NextPage } from "next";
import Head from "next/head";
import SearchBox from "../components/search-box";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Which Beatle?</title>
      </Head>
      <main>
        <SearchBox />
      </main>
    </>
  );
};

export default Home;
