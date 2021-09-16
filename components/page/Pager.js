import styles from "./Pager.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import classes from "classnames";
import { useState, useEffect } from "react";

export default function Pager({ handleLoad, nextPage, loading, page, heartbeat, onExit }) {
	const router = useRouter();
	const [clicked, setClicked] = useState(false);
	const buttonStyle = classes({ [styles.clicked]: clicked });
	const loadingStyle = classes(styles["lds-hourglass"], styles.heartbeat);

	useEffect(() => router.prefetch(`/page/${nextPage}`).then(), []);
	const gotToNextPage = () => {
		setClicked(true);
		onExit(true);
		setTimeout(() => router.push(`/page/${nextPage}`), 1300);
	};

	return (
		<div className={styles.pager} onClick={(e) => e.stopPropagation()}>
			<a onMouseDown={gotToNextPage} onTouchStart={gotToNextPage}>
				{!loading && (
					<div className={buttonStyle}>
						<span>{page}</span>
					</div>
				)}
				{loading && <div className={loadingStyle}></div>}
			</a>
			{/*<Link href={`/page/${nextPage}`} ></Link>*/}
		</div>
	);
}
