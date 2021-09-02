import styles from "./box.module.scss";
import { colorContext } from '../../context/color'
import { useContext } from "react";

export default function Container({ children }) {
  const { color, cycleColor } = useContext(colorContext)
  return (
    <div className={styles.container} style={{backgroundColor:color}}>
      BEBE
    </div>
  );
}
