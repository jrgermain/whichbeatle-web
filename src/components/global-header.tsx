import Image from "next/image";
import Link from "next/link";
import styles from "./global-header.module.css";
import NavLink from "./nav-link";

const GlobalHeader = () => (
  <header className={styles.header}>
    <Link href="/" data-testid="home-link" className={styles.logo}>
      <Image
        src="/images/logo.png"
        alt="Which Beatle?"
        height={56}
        width={110}
      />
      <span className="sr-only">Home</span>
    </Link>
    <input type="checkbox" className={styles.toggle} id="toggle-nav" />
    <label className={styles.hamburger} htmlFor="toggle-nav">
      <span className={`sr-only ${styles.expand}`}>Expand Navigation</span>
      <span className={`sr-only ${styles.close}`}>Close Navigation</span>
      <span className={styles.line} />
      <span className={styles.line} />
      <span className={styles.line} />
    </label>
    <nav>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/rest-api">API</NavLink>
    </nav>
  </header>
);

export default GlobalHeader;
