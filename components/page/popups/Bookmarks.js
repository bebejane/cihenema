import styles from "./Bookmarks.module.scss";
import Link from "next/link";
import PopUp from "./";
import { useEffect, useState, useContext } from "react";
import { BookmarksContext } from "@/lib/context/bookmarks";

export default function Bookmarks({ showBookmarks, setShowBookmarks }) {
	const {bookmarks, dispatch} = useContext(BookmarksContext);
	if (!showBookmarks) return null;
	
	return (
		<PopUp header={"Bookmarks"} show={showBookmarks} setShow={setShowBookmarks}>
			<ul className={styles.list}>
				{bookmarks.length ? bookmarks.map((m) => (
					<li className={styles.item}>
						<Link href={`/page/${m.page}#${m.imdb}`} prefetch={true}>
							<a>
								<div className={styles.title}>
									{m.titleEnglish || m.title}
									<div className={styles.director}>
										{m.director} ({m.year})
									</div>
								</div>
							</a>
						</Link>
						<div className={styles.delete} onClick={() => dispatch({id:m.imdb, type:'DELETE'})}>
							<img src={"/images/minus.svg"} />
						</div>
					</li>
				))
				:
					<div className={styles.empty}>
						Nix hier...
					</div>
				}
			</ul>
		</PopUp>
	);
}
