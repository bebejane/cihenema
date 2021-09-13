import styles from "./InfoBox.module.scss";
import Link from "next/link";
import classes from "classnames";
import { useEffect, useState } from "react";
import { isBookmarked, toggleBookmark } from "@/lib/bookmarks";

export default function InfoBox({ showInfo, setShowInfo, post, setSearch, setShowSearch}) {

	if(!post) return null

	const containerStyle = classes(styles["info-box"], { [styles.toggled]: showInfo });
	const [bookmarked, setBookmarked] = useState(false);

	const toggleBook = (post) => {
		toggleBookmark(post)
		setBookmarked(isBookmarked(post.imdb));
	};

	useEffect(() => setBookmarked(isBookmarked(post.imdb)), [post]);

	return (
		<div className={containerStyle} onClick={(e) => e.stopPropagation()}>
			<div className={styles.icons}>					
				<div className={styles.find} onClick={() => setShowSearch(true)}>
					<img title={`Press 'F'`} src={"/images/find.svg"} />
				</div>
				<div className={classes(styles.bookmark, { [styles.toggled]: bookmarked })} onClick={() => toggleBook(post)}>
					<img title={`Press 'B'`} src={"/images/plus.svg"} />
				</div>
				<div className={styles.close} onClick={() => setShowInfo(false)}>
					<img title={`Press 'ESC'`} src={"/images/close.svg"} />
				</div>
			</div>
			<div className={styles.name}>
				{post.title || post.titleEnglish }
			</div>
			<div className={styles.director}>
				{post.director} · {post.year}
			</div>
			<div className={styles.summary} onClick={(e) => e.stopPropagation()}>
				<div>
					{post.excerpt}
					{post.titleEnglish && <span className={styles.nameorg}>aka: {post.titleEmglish}</span>}
				</div>
				<div className={styles.links} onClick={(e) => e.stopPropagation()}>
					{post.imdb && (
						<Link href={"https://imdb.com/title/" + post.imdb}>
							<a target="_new">Imdb</a>
						</Link>
					)}
					<Link href={`https://youtube.com/results?search_query=${post.title} ${post.year || ""}`}>
						<a target="_new">Youtube</a>
					</Link>
					<Link href={`https://bitsearch.to/search?q=${post.title} ${post.year || ""}&category=1&subcat=2`}>
						<a target="_new">Torrent</a>
					</Link>
					<Link href={`https://thepiratebay.org/search.php?q=${post.title}&cat=201`}>
						<a target="_new">TPB</a>
					</Link>
				</div>
				
			</div>
		</div>
	);
}
