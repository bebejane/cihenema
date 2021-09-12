import styles from "./Excerpt.module.scss";
import Link from "next/link";
import classes from "classnames";

export default function Excerpt({ showExcerpt, setShowExcerpt, post, setSearch }) {
	return (
		<div className={classes(styles.excerpt, showExcerpt ? styles.toggled : "")}>
			{post && (
				<>
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
					</div>
				</>
			)}
		</div>
	);
}
