import s from "./Search.module.scss";
import Link from "next/link";
import PopUp from "./PopUp";
import { useUI, UIAction, UIPopup } from "@/lib/context/ui";
import useSearch from "@/lib/hooks/useSearch";
import { useRef } from "react";

export default function Search({ }) {
	
	const [{popup}, setUI] = useUI();
	const searchRef = useRef();
	const [search, setSearch] = useSearch();
	
	return (
		<PopUp 
			header={"Search"} 
			show={popup === UIPopup.SEARCH} 
			type={UIPopup.SEARCH
		}>
			<form className={s.searchForm} onSubmit={(e) => e.preventDefault()}>
				<input
					type="text"
					value={search.q}
					onChange={(e) => setSearch(e.target.value)}
					ref={searchRef}
					placeholder={"Type it..."}
				/>
			</form>
			<ul className={s.list}>
				{search.result.map((m, idx) => (
					<li key={idx} className={s.item}>
						<Link href={`/page/${m.item.p}#${m.item.i}`} prefetch={true}>
							<a>
								<div className={s.title}>
									{m.item.ten || m.item.t}
									<div className={s.director}>
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
