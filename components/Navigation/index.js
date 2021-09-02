import styles from "./navigation.module.scss";
import Link from "next/link";

export default function Navigation({ children }) {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.nav}>Home</a>
      </Link>
      <Link className={styles.nav} href="/about">
        <a className={styles.nav}>About</a>
      </Link>
      <Link className={styles.nav} href="/cinema">
        <a className={styles.nav}>Cinema</a>
      </Link>
    </div>
  );
}
