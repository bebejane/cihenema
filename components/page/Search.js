import styles from "./Search.module.scss";
import Link from "next/link";
import classes from "classnames";
import useSearch from "@/lib/hooks/useSearch";
import { useRef } from "react";

export default function Search({ showSearch, setShowSearch }) {
	
	if(!showSearch) return null

	const searchRef = useRef();
	const [search, setSearch] = useSearch();

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
