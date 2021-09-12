import styles from "./Pager.module.scss";
import Link from "next/link";
import classes from "classnames";

export default function Pager({ handleLoad, nextPage, loading, page, heartbeat }) {
	const buttonStyle = classes({ [styles.heartbeat]: heartbeat });
	const loadingStyle = classes(styles["lds-hourglass"], styles.heartbeat);
	return (
		<div className={styles.pager} onClick={(e) => e.stopPropagation()}>
			<Link href={`/page/${nextPage}`}>
				<a>
					{!loading && (
						<div className={buttonStyle}>
							<span>{page}</span>
						</div>
					)}
					{loading && <div className={loadingStyle}></div>}
				</a>
			</Link>
		</div>
	);
}
