import { useState, useEffect } from "react";
import styles from "./Gallery.module.scss";
import classes from "classnames";

export default function Gallery({ posts, setShowExcerpt, setImageLoaded }) {
	const [firstLoaded, setFirstLoaded] = useState(false);

  if(!firstLoaded)
    posts = posts.slice(0,1).map((p) => { return {...p, images:p.images.slice(0,1)}})
  
  useEffect(() => setImageLoaded(firstLoaded), [firstLoaded])
  
	return posts.map((post, pidx) => {
		return post.images.map((img, idx) => (
			<div id={idx === 0 ? post.imdb : ""} className={styles.slide} key={idx} onClick={() => setShowExcerpt(false)}>
				<div className={styles.wrap}>
					<img src={img}  onLoad={() => !firstLoaded && setFirstLoaded(true)} />
				</div>
			</div>
		));
	});
}
