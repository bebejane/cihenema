import styles from "./Search.module.scss";
import Link from "next/link";
import classes from "classnames";
import { useEffect } from "react";

export default function Search({ searchRef, search, setSearch, showSearch, setShowSearch }) {
	
	//useEffect(() => search.q  && setShowSearch(true), [search]);
	
	if(!showSearch) return null

	return (
			<div className={styles.search} onClick={(e) => e.stopPropagation()}>
				<div className={styles.header}>
					Search
					<div className={styles.close} onClick={(e)=>setShowSearch(false)}><img src={"/images/close.svg"} /></div>
					<form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
						<input ref={searchRef} placeholder={"Search..."} type="text" onChange={(e) => setSearch(e.target.value)} value={search.q} />
					</form>
				</div>
				<ul className={styles.list}>
					{search.result.map((m) => (
						<li className={styles.item}>
							<Link href={`/page/${m.item.p}#${m.item.i}`} prefetch={true}>
								<a>
									<div className={styles.title}>
										{m.item.ten || m.item.t}
										<div className={styles.director}>{m.item.d} ({m.item.y})</div>
									</div>
								</a>
							</Link>
						</li>
					))}
				</ul>
			</div>
	);
}
