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
    <Link
      href={href}
      className={styles.link}
      aria-current={pathname === href ? "page" : undefined}
      onClick={() => {
        /*
         * If JS is enabled, the page doesn't really reload when a Next Link
         * is clicked. On small screens, this means that the navigation menu
         * stays open when switching between pages. When this happens, we can
         * programmatically close the menu.
         */
        const toggle = document.querySelector<HTMLInputElement>("#toggle-nav");
        if (toggle) {
          toggle.checked = false;
        }
      }}
    >
      {children}
    </Link>
  );
};

export default NavLink;
