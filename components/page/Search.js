import styles from "./Search.module.scss";
import Link from "next/link";
import classes from "classnames";
import { useEffect } from "react";

export default function Search({ searchRef, search, setSearch, toggleSearch, setToggleSearch }) {
	const containerStyle = classes(styles.search, { [styles.toggled]: toggleSearch });
	const toggleStyle = classes(styles.searchToggle, { [styles.toggled]: toggleSearch });
	useEffect(() => search.q && !toggleSearch && setToggleSearch(true), [search]);

	return (
		<div className={containerStyle} onClick={(e) => e.stopPropagation()}>
			<form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
				<input ref={searchRef} placeholder={"Search..."} type="text" onChange={(e) => setSearch(e.target.value)} value={search.q} />
				<div className={styles.reset} onClick={() => setToggleSearch(false)}>
					×
				</div>
			</form>
			<div className={styles.results}>
				{search.result.map((m) => (
					<div className={styles.item}>
						<Link href={`/page/${m.item.p}#${m.item.i}`} prefetch={true}>
							<a>
								<div className={styles.title}>
									{m.item.ten || m.item.t}
									<div className={styles.director}>{m.item.d}</div>
								</div>
								<div className={styles.year}>{m.item.y}</div>
							</a>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
