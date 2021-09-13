import { useState, useEffect } from "react";
import styles from "./Gallery.module.scss";
import { useRouter } from 'next/router'
import classes from "classnames";

export default function Gallery({ posts, setShowExcerpt, setImageLoaded,  }) {
	
	const router = useRouter()
	const imdbId = router.asPath.includes('#') ? router.asPath.substring(router.asPath.indexOf('#')+1) : null
	const [firstLoaded, setFirstLoaded] = useState(false);
	
	if (!firstLoaded && !imdbId)
		posts = posts.slice(0, 1).map((p) => { return { ...p, images: p.images.slice(0, 1) }});
	
	useEffect(() => setImageLoaded(firstLoaded), [firstLoaded]);
	useEffect(() => setTimeout(()=> !firstLoaded && setFirstLoaded(true), 3000), [])
	
	return posts.map((post, pidx) => {
		return post.images.map((img, idx) => (
			<div id={idx === 0 ? post.imdb : ""} className={styles.slide} key={idx} onClick={() => setShowExcerpt(false)}>
				<div className={styles.wrap}>
					<img src={img} onLoad={() => !firstLoaded && setFirstLoaded(true)}/>
				</div>
			</div>
		));
	});
}
