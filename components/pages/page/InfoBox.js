import s from "./InfoBox.module.scss";
import cn from "classnames";
import Link from "next/link";

import { useUI, UIAction, UIPopup } from "@/lib/context/ui";
import { useEffect, useState, useContext } from "react";
import { useBookmarks } from "@/lib/context/bookmarks";

export default function InfoBox({
	post,
}) {
	if (!post) return null;

	const [{showInfo}, setUI] = useUI()
	const containerStyle = cn(s["info-box"], { [s.toggled]: showInfo });
	const [bookmarked, setBookmarked] = useState(false);
	const [bookmarks, setBookmarks] = useBookmarks()
	
	useEffect(() => setBookmarked(!!(bookmarks.filter(b => b.imdb === post.imdb).length), [post, bookmarks]))

	return (
		<div className={containerStyle} onClick={(e) => e.stopPropagation()}>
			<div className={s.icons}>
				<div className={s.find} onClick={() => setUI({type:UIAction.SHOW_POPUP, popup:UIPopup.SEARCH})}>
					<img title={`Press 'F'`} src={"/images/find.svg"} />
				</div>
				<div className={s.find} onClick={() =>  setUI({type:UIAction.SHOW_POPUP, popup:UIPopup.BOOKMARKS})}>
					<img title={`Press 'B'`} src={"/images/bookmark.svg"} />
				</div>
				<div
					className={cn(s.bookmark, { [s.toggled]: bookmarked })}
					onClick={() => setBookmarks({post, type:'TOGGLE'})}
				>
					<img title={`Toggle bookmark`} src={"/images/plus.svg"} />
				</div>
				<div className={s.close} onClick={() => setUI({type:UIAction.HIDE_INFO})}>
					<img title={`Press 'ESC'`} src={"/images/close.svg"} />
				</div>
			</div>
			<div className={s.name}>{post.title}</div>
			{post.titleEnglish && <div className={s.nameorg}>{post.titleEnglish}</div>}
			<div className={s.director}>
				{post.director} · {post.year}
			</div>
			<div className={s.summary} onClick={(e) => e.stopPropagation()}>
				<div>
					{post.excerpt}
				</div>
				<div className={s.links} onClick={(e) => e.stopPropagation()}>
					{post.imdb && (
						<Link href={"https://imdb.com/title/" + post.imdb}>
							<a target="_new">Imdb</a>
						</Link>
					)}
					<Link href={`https://youtube.com/results?search_query=${post.title} ${post.year || ""}`}>
						<a target="_new">Youtube</a>
					</Link>
					<Link
						href={`https://bitsearch.to/search?q=${post.title} ${post.year || ""}&category=1&subcat=2`}
					>
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
