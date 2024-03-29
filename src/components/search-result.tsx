import Image from "next/image";
import styles from "./search-result.module.css";

type SearchResultProps = {
  title: string;
  album: string;
  singer: string;
  composer: string;
  videoUrl: string | null | undefined;
};

const SearchResult = ({
  title,
  album,
  singer,
  composer,
  videoUrl,
}: SearchResultProps) => (
  <article className={styles["search-result"]}>
    {!!videoUrl && (
      <iframe className={styles.video} allowFullScreen src={videoUrl} />
    )}
    <div className={styles.details}>
      <h1 className={styles.song} data-testid="song-title">
        {title}
      </h1>
      <span className={styles.album}>
        <span className={styles["icon-container"]}>
          <Image
            className={styles.icon}
            src="/images/album.svg"
            alt=""
            width={48}
            height={48}
          />
        </span>
        <span className={styles.label}>Album</span>
        <span className={styles["album-name"]} data-testid="album-name">
          {album}
        </span>
      </span>
      <span className={styles.singer}>
        <span className={styles["icon-container"]}>
          <Image
            className={styles.icon}
            src="/images/singer.svg"
            alt=""
            width={48}
            height={48}
          />
        </span>
        <span className={styles.label}>Singer</span>
        <span className={styles["singer-name"]} data-testid="singer-name">
          {singer}
        </span>
      </span>
      <span className={styles.composer}>
        <span className={styles["icon-container"]}>
          <Image
            className={styles.icon}
            src="/images/composer.svg"
            alt=""
            width={48}
            height={48}
          />
        </span>
        <span className={styles.label}>Composer</span>
        <span className={styles["composer-name"]} data-testid="composer-name">
          {composer}
        </span>
      </span>
    </div>
  </article>
);

export default SearchResult;
