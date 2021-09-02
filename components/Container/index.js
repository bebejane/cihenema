import styles from "./container.module.scss";
import Link from "next/link"
import { colorContext,colorTypes } from '../../context/color'
import { useContext } from "react";

export default function Container({ children }) {
  const { color, cycleColor } = useContext(colorContext)

  return (
    <div className={styles.container} style={{backgroundColor:color}} onClick={() => cycleColor()}>
      
    </div>
  );
}
