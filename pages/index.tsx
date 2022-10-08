import type { NextPage } from "next";
import Head from "next/head";
import SearchBox from "../components/search-box";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Which Beatle?</title>
      </Head>
      <SearchBox />
    </div>
  );
};

export default Home;
