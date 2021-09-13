import styles from "./InfoBox.module.scss";
import Link from "next/link";
import classes from "classnames";
import { useEffect, useState } from "react";

const isFavourite = (id) => {
	let favs = localStorage.getItem("favourites") ? JSON.parse(localStorage.getItem("favourites")) : [];
	return favs.includes(id);
};

export default function InfoBox({ showExcerpt, setShowExcerpt, post, setSearch }) {
	const containerStyle = classes(styles["info-box"], { [styles.toggled]: showExcerpt });
	const [favourite, setFavourite] = useState(false);

	const toggleFavourite = (id) => {
		let favs = localStorage.getItem("favourites") ? JSON.parse(localStorage.getItem("favourites")) : [];
		if (!favs.includes(id)) favs.push(id);
		else favs = favs.filter((i) => i !== id);
		localStorage.setItem("favourites", JSON.stringify(favs));
		setFavourite(isFavourite(id));
	};

	useEffect(() => setFavourite(isFavourite(post.imdb)), [post]);

	return (
		<div className={containerStyle} onClick={(e) => e.stopPropagation()}>
			<div className={styles.name}>{post.titleEnglish || post.title}</div>
			<div className={styles.director}>
				{post.director} · {post.year}
			</div>
			<div className={styles.summary} onClick={(e) => e.stopPropagation()}>
				<div>
					{post.excerpt}
					{post.titleEnglish && <span className={styles.nameorg}>aka: {post.title}</span>}
				</div>
				<div className={styles.links} onClick={(e) => e.stopPropagation()}>
					{post.imdb && (
						<Link href={"https://imdb.com/title/" + post.imdb}>
							<a target="_new">Imdb</a>
						</Link>
					)}
					<Link href={`https://youtube.com/results?search_query=${post.titleEnglish || post.title} ${post.year || ""}`}>
						<a target="_new">Youtube</a>
					</Link>
					<Link href={`https://bitsearch.to/search?q=${post.titleEnglish || post.title} ${post.year || ""}&category=1&subcat=2`}>
						<a target="_new">Torrent</a>
					</Link>
					<Link href={`https://thepiratebay.org/search.php?q=${post.titleEnglish || post.title}&cat=201`}>
						<a target="_new">TPB</a>
					</Link>
				</div>
				<div className={styles.close} onClick={() => setShowExcerpt(false)}>
					<img src={"/images/close.svg"} />
				</div>
				<div className={classes(styles.favourite, { [styles.toggled]: favourite })} onClick={() => toggleFavourite(post.imdb)}>
					<img src={"/images/plus.svg"} />
				</div>
			</div>
		</div>
	);
}
