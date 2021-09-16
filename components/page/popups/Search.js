import styles from "./Search.module.scss";
import Link from "next/link";
import PopUp from "./";
import useSearch from "@/lib/hooks/useSearch";
import { useRef } from "react";

export default function Search({ showSearch, setShowSearch }) {
	if (!showSearch) return null;

	const searchRef = useRef();
	const [search, setSearch] = useSearch();

	return (
		<PopUp header={"Search"} show={showSearch} setShow={setShowSearch}>
			<form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
				<input
					type="text"
					value={search.q}
					onChange={(e) => setSearch(e.target.value)}
					ref={searchRef}
					placeholder={"Type it..."}
				/>
			</form>
			<ul className={styles.list}>
				{search.result.map((m) => (
					<li className={styles.item}>
						<Link href={`/page/${m.item.p}#${m.item.i}`} prefetch={true}>
							<a>
								<div className={styles.title}>
									{m.item.ten || m.item.t}
									<div className={styles.director}>
										{m.item.d} ({m.item.y})
									</div>
								</div>
							</a>
						</Link>
					</li>
				))}
			</ul>
		</PopUp>
	);
}
