import { useState, useEffect } from "react";
import styles from "./Gallery.module.scss";
import GalleryImage from "./GallaryImage";
import { useRouter } from "next/router";

export default function Gallery({ posts, post = {}, setShowInfo, setImageLoaded }) {
	const router = useRouter();
	const imdbId = router.asPath.includes("#")
		? router.asPath.substring(router.asPath.indexOf("#") + 1)
		: null;
	const [firstLoaded, setFirstLoaded] = useState(false);

	if (!firstLoaded && !imdbId)
		posts = posts.slice(0, 1).map((p) => {
			return { ...p, images: p.images.slice(0, 1) };
		});

	useEffect(() => setImageLoaded(firstLoaded), [firstLoaded]);
	useEffect(() => setTimeout(() => !firstLoaded && setFirstLoaded(true), 3000), []);

	return posts.map((p, pidx) => {
		return p.images.map((src, idx) => (
			<GalleryImage
				imdbId={p.imdb}
				src={src}
				index={pidx}
				imageIndex={idx}
				onLoad={() => pidx === 0 && idx === 0 && setFirstLoaded(true)}
				onClick={() => setShowInfo(false)}
			/>
		));
	});
}
