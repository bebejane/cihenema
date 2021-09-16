import styles from "./index.module.scss";

export default function PopUp({ header, show, setShow, children}) {
	
  if(!show) return null
  
	return (
		<div className={styles.popup} onClick={(e) => e.stopPropagation()}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          {header}
          <div className={styles.close} onClick={(e)=>setShow(false)}><img src={"/images/close.svg"} /></div>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
		</div>
	);
}
