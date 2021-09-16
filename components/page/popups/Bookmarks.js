import styles from "./Bookmarks.module.scss";
import Link from "next/link";
import PopUp from "./";
import { useEffect, useState } from "react";
import { getBookmarks, toggleBookmark } from "@/lib/bookmarks";

export default function Bookmarks({ showBookmarks, setShowBookmarks }) {
	const [bookmarks, setBookmarks] = useState([]);

	useEffect(() => setBookmarks(getBookmarks()), [showBookmarks]);

	const deleteBookmark = (post) => {
		const marks = bookmarks.filter((b) => b.imdb !== post.imdb);
		toggleBookmark(post);
		setBookmarks(marks);
	};

	if (!showBookmarks) return null;
	console.log(showBookmarks, bookmarks);
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
						<div className={styles.delete} onClick={() => deleteBookmark(m)}>
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
