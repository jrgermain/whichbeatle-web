import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import SearchBox from "../components/search-box";
import SearchResult from "../components/search-result";
import * as SearchService from "../services/search";
import * as YouTubeService from "../services/youtube";
import Song from "../types/song";
import styles from "./search.module.css";

type SongWithVideoUrl = Song & { videoUrl: string | null };
type SearchProps = {
  song: string | undefined;
  results: SongWithVideoUrl[];
};

const Search: NextPage<SearchProps> = ({ song, results }) => {
  return (
    <div>
      <Head>
        <title>Search - Which Beatle?</title>
      </Head>
      <SearchBox defaultValue={song?.toString()} />
      <div className={styles.results}>
        {results.length ? (
          results.map((result, i) => <SearchResult key={i} {...result} />)
        ) : (
          <span className={styles["no-results"]}>No results found</span>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<SearchProps> = async ({
  query,
}) => {
  const { song: _song } = query;
  const song = Array.isArray(_song) ? _song.at(-1) : _song;

  if (!song) {
    return {
      props: { song, results: [] },
    };
  }

  const results = await Promise.all(
    SearchService.findAllByTitle(song).map(async (song) => ({
      ...song,
      videoUrl: await YouTubeService.getVideoUrl(song.title),
    }))
  );

  return {
    props: { song, results },
  };
};

export default Search;
