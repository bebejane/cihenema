import s from "./Bookmarks.module.scss";
import Link from "next/link";
import PopUp from "./PopUp";
import { useEffect, useState, useContext } from "react";
import { BookmarksContext } from "@/lib/context/bookmarks";

export default function Bookmarks({ showBookmarks, setShowBookmarks }) {
	const {bookmarks, dispatch} = useContext(BookmarksContext);
	if (!showBookmarks) return null;
	
	return (
		<PopUp header={"Bookmarks"} show={showBookmarks} setShow={setShowBookmarks}>
			<ul className={s.list}>
				{bookmarks.length ? bookmarks.map((m) => (
					<li className={s.item}>
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
						<div className={s.delete} onClick={() => dispatch({id:m.imdb, type:'DELETE'})}>
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
