import { ReactNode } from "react";
import styles from "./content-layout.module.css";

type ContentLayoutProps = {
  children?: ReactNode;
};

const ContentLayout = ({ children }: ContentLayoutProps) => (
  <article className={styles.content}>{children}</article>
);

export default ContentLayout;
