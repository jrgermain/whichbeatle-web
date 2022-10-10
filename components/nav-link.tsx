import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import styles from "./nav-link.module.css";

type NavLinkProps = {
  href: string;
  children?: ReactNode;
  isExact?: boolean;
};

const NavLink = ({ href, children, isExact }: NavLinkProps) => {
  const { pathname } = useRouter();
  const isCurrent = isExact ? pathname === href : pathname.startsWith(href);
  return (
    <Link href={href}>
      <a className={styles.link} aria-current={isCurrent ? "page" : undefined}>
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
