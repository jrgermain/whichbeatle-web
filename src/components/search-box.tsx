import styles from "./search-box.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
import Head from "next/head";
import LoadingSpinner from "./loading-spinner";

type SearchBoxProps = {
  defaultValue?: string;
};

const SearchBox = ({ defaultValue }: SearchBoxProps) => {
  const [isFetching, setFetching] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const fillRandomSong = () => {
    // If no results in .3 seconds (serverless function cold start), show a spinner
    const showSpinner = setTimeout(() => setFetching(true), 300);

    fetch("/api/songs/random")
      .then((res) => res.text())
      .then((text) => ref.current && (ref.current.value = text))
      .finally(() => clearTimeout(showSpinner)) // If our call returns and the spinner hasn't shown yet, cancel showing it
      .finally(() => setFetching(false)); // If our call returns and the spinner was already up, hide it
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
              disabled={isFetching}
            >
              {isFetching ? (
                <LoadingSpinner className={styles.spinner} />
              ) : (
                <Image
                  src="/images/shuffle.svg"
                  height={24}
                  width={24}
                  className={styles["button-icon"]}
                  alt=""
                />
              )}
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
