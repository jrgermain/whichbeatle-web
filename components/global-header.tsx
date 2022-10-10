import Image from "next/image";
import Link from "next/link";
import styles from "./global-header.module.css";
import NavLink from "./nav-link";

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
    <nav>
      <NavLink href="/" isExact>
        Home
      </NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/rest-api">API</NavLink>
    </nav>
  </header>
);

export default GlobalHeader;
