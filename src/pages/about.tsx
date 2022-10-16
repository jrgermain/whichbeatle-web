import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ContentLayout from "../components/content-layout";
import styles from "./about.module.css";

const Api: NextPage = () => {
  return (
    <>
      <Head>
        <title>About - Which Beatle?</title>
      </Head>
      <main>
        <ContentLayout>
          <div className={styles.logo}>
            <Image
              src="/images/logo.png"
              alt="Which Beatle?"
              height={112}
              width={220}
            />
          </div>
          <p className={styles.slogan}>
            Find info about Beatles songs, listen to your favorites, and
            discover new ones!
          </p>
          <p>
            <em>Which Beatle?</em> is a website where you can type the name of
            any Beatles song and find who wrote it, who sang it, and what albums
            it appeared on. We also integrate with YouTube to let you listen to
            the songs you look up.
          </p>
          <p>
            If you{"'"}re interested in seeing the code for this website, take a
            look at its{" "}
            <a
              href="https://github.com/jrgermain/whichbeatle-web"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              GitHub repository
            </a>
            .
          </p>
          <p>
            If you{"'"}re interested in the person who built this site (really,
            I{"'"}m flattered), check out my{" "}
            <a
              href="https://www.jrgermain.dev/"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              personal site
            </a>
            .
          </p>
        </ContentLayout>
      </main>
    </>
  );
};

export default Api;
