import Image from "next/image";
import Link from "next/link";
import styles from "./global-header.module.css";

const GlobalHeader = () => (
  <header className={styles.header}>
    <Link href="/">
      <a>
        <Image
          className={styles.logo}
          src="/images/logo.png"
          alt="Which Beatle?"
          height={56}
          width={110}
        />
        <span className="sr-only">Home</span>
      </a>
    </Link>
  </header>
);

export default GlobalHeader;
