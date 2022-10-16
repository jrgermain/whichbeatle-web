import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import styles from "./nav-link.module.css";

type NavLinkProps = {
  href: string;
  children?: ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  const { pathname } = useRouter();
  return (
    <Link href={href}>
      <a
        className={styles.link}
        aria-current={pathname === href ? "page" : undefined}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
