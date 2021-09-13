import styles from "./index.module.scss";
import Head from "next/head";
import classes from "classnames";
import Loader from "@/components/common/Loader";
import Search from "./Search";
import InfoBox from "./InfoBox";
import Gallery from "./Gallery";
import Pager from "./Pager";
import Bookmarks from "./Bookmarks";
import usePWA from "@/lib/hooks/usePWA";
import { useEffect, useState, useRef } from "react";
import useScrollPosition from "@react-hook/window-scroll";
import { useWindowSize } from "@react-hook/window-size";
import { useHotkeys } from "react-hotkeys-hook";

export default function Page({ posts, images, page, totalPages, newest }) {
	const [pwa] = usePWA();
	const [nextPage] = useState(Math.floor(Math.random() * totalPages));
	const [loading, setLoading] = useState(true);
	const [showExcerpt, setShowExcerpt] = useState(false);
	const [showBookmarks, setShowBookmarks] = useState(false);

	const [scrollPostIndex, setScrollPostIndex] = useState(undefined);

	const [imageLoaded, setImageLoaded] = useState(false);
	const [heartbeat, setHeartbeat] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [width, height] = useWindowSize();
	const scrollY = useScrollPosition(30);
	const post = scrollPostIndex != undefined ? posts[scrollPostIndex[Math.floor(scrollY+(height/2))]] : undefined

	useEffect(() => setScrollPostIndex(getScrollPostIndex(posts, height)), [height]);
	useEffect(() => setLoading(true), [page]);
	useEffect(() => imageLoaded && setTimeout(() => setLoading(false), 500), [imageLoaded]);
	useHotkeys("s", () => setShowSearch((showSearch) => !showSearch));
	useHotkeys("b", () => setShowBookmarks((showBookmarks) => !showBookmarks));
	useHotkeys("esc", () => setShowExcerpt(false));

	if (scrollY > height * images - height * 3 && !heartbeat) setHeartbeat(true);

	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<title>Cihenema</title>
			</Head>
			<main className={classes(styles.container, styles.scroll)} onClick={() => setShowExcerpt(!showExcerpt)}>
				<Gallery {...{ posts, setShowExcerpt, setImageLoaded, post }} />
				<InfoBox {...{ setShowExcerpt, showExcerpt, post, setShowSearch }} />
				<Pager {...{ nextPage, loading, page, heartbeat }} />
				<Search {...{ showSearch, setShowSearch }} />
				<Bookmarks {...{ showBookmarks, setShowBookmarks }} />
				<Loader loading={loading} />
			</main>
		</>
	);
}

const getScrollPostIndex = function (posts, height) {
	const totalHeight = posts.reduce((acc, curr) => acc + curr.images.length)*height;
	const scrollMap = {}
	let px = 0
	posts.forEach((p, idx)=>{
		for (let h = 0; h < (p.images.length*height) ; h++, px++)
			scrollMap[px] = idx
	})
	//for (; px <= totalHeight;px++) scrollMap[px] = posts.length-1

	return scrollMap
};
