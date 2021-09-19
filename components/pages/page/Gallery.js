import { useState, useEffect } from "react";
import s from "./Gallery.module.scss";
import GalleryImage from "./GallaryImage";
import { useRouter } from "next/router";
import { useUI, UIAction } from "@/lib/context/ui";

export default function Gallery({ posts, post = {}, setShowInfo, setImageLoaded }) {
	const router = useRouter();
	const [{showInfo, showBookmarks, showSearch}, setUI] = useUI()
	const imdbId = router.asPath.includes("#")
		? router.asPath.substring(router.asPath.indexOf("#") + 1)
		: null;
	const [firstLoaded, setFirstLoaded] = useState(false);

	if (!firstLoaded && !imdbId)
		posts = posts.slice(0, 1).map((p) => {
			return { ...p, images: p.images.slice(0, 1) };
		});

	useEffect(() => setImageLoaded(firstLoaded), [firstLoaded]);
	useEffect(() => setTimeout(() => !firstLoaded && setFirstLoaded(true), 10000), []);
	
	return posts.map((p, pidx) => {
		return p.images.map((src, idx) => (
			<GalleryImage
				key={idx}
				imdbId={p.imdb}
				src={src}
				index={pidx}
				imageIndex={idx}
				onLoad={() => pidx === 0 && idx === 0 && setFirstLoaded(true)}
				onClick={() => setUI({type:UIAction.TOGGLE_INFO})}
			/>
		));
	});
}
