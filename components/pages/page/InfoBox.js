import s from "./InfoBox.module.scss";
import cn from "classnames";
import Link from "next/link";
import InfoBoxNav from "./InfoBoxNav";
import { useUI } from "@/lib/context/ui";

export default function InfoBox({ post }) {
	if (!post) return null;
	const [{ showInfo }] = useUI();

	return (
		<>
			<aside className={cn(s.infobox, {[s.toggled]:showInfo})}>
				<InfoBoxNav post={post}/>
				<h1 className={s.name}>
					{post.title}
				</h1>
				{post.titleEnglish && <h3 className={s.nameorg}>{post.titleEnglish}</h3>}
				<h2 className={s.director}>
					{post.director} · {post.year}
				</h2>
				<section className={s.summary}>
					<summary>{post.excerpt}</summary>
					<div className={s.links}>
						{post.imdb && (
							<Link href={"https://imdb.com/title/" + post.imdb}>
								<a target="_new">Imdb</a>
							</Link>
						)}
						<Link href={`https://youtube.com/results?search_query=${post.title} ${post.year || ""}`}>
							<a target="_new">Youtube</a>
						</Link>
						<Link
							href={`https://bitsearch.to/search?q=${post.title} ${
								post.year || ""
							}&category=1&subcat=2`}
						>
							<a target="_new">Torrent</a>
						</Link>
						<Link href={`https://thepiratebay.org/search.php?q=${post.title}&cat=201`}>
							<a target="_new">TPB</a>
						</Link>
					</div>
				</section>
			</aside>
			<aside className={cn(s.infoheader, {[s.toggled]:showInfo})}>
				<h1 className={s.name}>
				{post.title}
				</h1>
				{post.titleEnglish && <h3 className={s.nameorg}>{post.titleEnglish}</h3>}
				<h2 className={s.director}>
					{post.director} · {post.year}
				</h2>
			</aside>
		</>
	);
}
