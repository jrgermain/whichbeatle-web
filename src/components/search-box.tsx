import styles from "./search-box.module.css";
import Image from "next/image";
import { useRef } from "react";
import Head from "next/head";

type SearchBoxProps = {
  defaultValue?: string;
};

const SearchBox = ({ defaultValue }: SearchBoxProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const fillRandomSong = () => {
    fetch("/api/songs/random")
      .then((res) => res.text())
      .then((text) => ref.current && (ref.current.value = text));
  };
  return (
    <>
      <Head>
        <noscript>
          <style>{"#random { display: none; }"}</style>
        </noscript>
      </Head>
      <form className={styles["search-form"]} method="get" action="/search">
        <div className={styles["search-box"]}>
          <input
            type="text"
            name="song"
            placeholder="Search for a Beatles song"
            aria-label="Song Name"
            ref={ref}
            defaultValue={defaultValue}
            data-testid="search-box"
          />
          <span className={styles.actions}>
            <button
              type="button"
              id="random"
              title="Random Song"
              onClick={fillRandomSong}
              data-testid="randomize"
            >
              <Image
                src="/images/shuffle.svg"
                height={24}
                width={24}
                className={styles["button-icon"]}
                alt=""
              />
            </button>
            <button type="submit" title="Go">
              <Image
                src="/images/go.svg"
                height={24}
                width={24}
                className={styles["button-icon"]}
                alt=""
              />
            </button>
          </span>
        </div>
      </form>
    </>
  );
};

export default SearchBox;
