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
  const inputRef = useRef<HTMLInputElement>(null);

  const fillRandomSong = () => {
    // If no results in .3 seconds (serverless function cold start), show a spinner
    const showSpinner = setTimeout(() => setFetching(true), 300);

    fetch("/api/songs/random")
      .then((res) => res.json())
      .then((song) => inputRef.current && (inputRef.current.value = song.title))
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
      <form
        className={styles["search-form"]}
        method="get"
        action="/search"
        role="search"
      >
        <div className={styles["search-box"]}>
          <input
            required
            type="text"
            name="song"
            placeholder="Search for a Beatles song"
            aria-label="Song Name"
            ref={inputRef}
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
                  data-testid="shuffle-icon"
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
