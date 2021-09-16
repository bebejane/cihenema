import styles from "./Bookmarks.module.scss";
import Link from "next/link";
import classes from "classnames";
import { useEffect, useState } from "react";
import { getBookmarks, toggleBookmark } from "@/lib/bookmarks";

export default function Bookmarks({ showBookmarks, setShowBookmarks }) {
	
  const [bookmarks, setBookmarks] = useState([])
	
	useEffect(()=>setBookmarks(getBookmarks()), [showBookmarks]);

	const deleteBookmark = (post) => {
		const _bookmarks = bookmarks.filter((b)=> b.imdb !== post.imdb )
		toggleBookmark(post)
		setBookmarks(_bookmarks)
		
	}


  if(!showBookmarks) return null
  
	return (
		<div className={styles.bookmarks} onClick={(e) => e.stopPropagation()}>
      <div className={styles.header}>
        Bookmarks
        <div className={styles.close} onClick={(e)=>setShowBookmarks(false)}><img src={"/images/close.svg"} /></div>
      </div>
			<ul className={styles.list}>
				{bookmarks.reverse().map((m) => (
					<li className={styles.item}>
						<Link href={`/page/${m.page}#${m.imdb}`} prefetch={true}>
							<a>
								<div className={styles.title}>
									{m.titleEnglish || m.title}
									<div className={styles.director}>{m.director} ({m.year})</div>
								</div>
							</a>
						</Link>
						<div className={styles.delete} onClick={()=>deleteBookmark(m)}><img src={"/images/close.svg"} /></div>
					</li>
				))}
			</ul>
		</div>
	);
}
