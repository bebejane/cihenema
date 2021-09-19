import s from "./Bookmarks.module.scss";
import Link from "next/link";
import PopUp from "./PopUp";
import { useEffect, useState, useContext } from "react";
import { useBookmarks } from "@/lib/context/bookmarks";
import { useUI, UIAction, UIPopup } from "@/lib/context/ui";

export default function Bookmarks({ }) {
	const [bookmarks, setBookmarks] = useBookmarks()
	const [{popup}, setUI] = useUI();

	return (
		<PopUp header={"Bookmarks"} show={popup === UIPopup.BOOKMARKS} type={UIPopup.BOOKMARKS}>
			<ul className={s.list}>
				{bookmarks.length ? bookmarks.map((m, idx) => (
					<li key={idx} className={s.item}>
						<Link href={`/page/${m.page}#${m.imdb}`} prefetch={true}>
							<a>
								<div className={s.title}>
									{m.titleEnglish || m.title}
									<div className={s.director}>
										{m.director} ({m.year})
									</div>
								</div>
							</a>
						</Link>
						<div className={s.delete} onClick={() => setBookmarks({id:m.imdb, type:'DELETE'})}>
							<img src={"/images/minus.svg"} />
						</div>
					</li>
				))
				:
					<div className={s.empty}>
						Nix hier...
					</div>
				}
			</ul>
		</PopUp>
	);
}
