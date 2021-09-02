import styles from "./layout.module.scss";
import Navigation from "./Navigation";
import { useContext, useReducer } from "react";


export default function Layout({ children }) {
  
  return (
    <div className={styles.container}>
      <Navigation />
      {children}
    </div>
  );
}
