import styles from "./Pager.module.scss";
import Link from "next/link";
import classes from "classnames";
import { useState } from "react";

export default function Pager({ handleLoad, nextPage, loading, page, heartbeat }) {
	const [clicked, setClicked] = useState(false)
	const buttonStyle = classes({[styles.clicked]:clicked});
	const loadingStyle = classes(styles["lds-hourglass"], styles.heartbeat);
	
	return (
		<div className={styles.pager} onClick={(e) => e.stopPropagation()} >
			<Link href={`/page/${nextPage}`} >
				<a>
					{!loading && (
						<div className={buttonStyle} onMouseDown={()=>setClicked(true)} onTouchStart={()=>setClicked(true)}>
							<span>{page}</span>
						</div>
					)}
					{loading && <div className={loadingStyle}></div>}
				</a>
			</Link>
		</div>
	);
}
