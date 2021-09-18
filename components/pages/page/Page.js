import s from "./Page.module.scss";
import cn from "classnames";

import Loader from "@/components/common/Loader";
import InfoBox from "./InfoBox";
import Gallery from "./Gallery";
import Pager from "./Pager";
import Search from "./popups/Search";
import Bookmarks from "./popups/Bookmarks";

import Head from "next/head";


import { useUI, UIAction } from "@/lib/context/ui";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import usePWA from "@/lib/hooks/usePWA";
import useScrollPosition from "@react-hook/window-scroll";
import { useWindowSize } from "@react-hook/window-size";
import { useHotkeys } from "react-hotkeys-hook";
import version from "/VERSION";

export default function Page({ posts, images, page, totalPages, newest }) {

	const [state, dispatch] = useUI();
	const router = useRouter();
	const [nextPage] = useState(Math.floor(Math.random() * totalPages));
	const [loading, setLoading] = useState(true);
	const [deloading, setDeloading] = useState(false);
	const [showInfo, setShowInfo] = useState(false);
	const [showBookmarks, setShowBookmarks] = useState(false);
	const [scrollMap, setScrollMap] = useState({});
	const [imageLoaded, setImageLoaded] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [width, height] = useWindowSize();
	const [pwaState] = usePWA();
	const scrollY = useScrollPosition(30);

	const post = posts[scrollMap[Math.floor(scrollY + height / 2)]]

	useEffect(() => setScrollMap(getScrollMap(posts, height)), [height]);
	useEffect(() => setLoading(true), [page]);
	useEffect(() => imageLoaded && setTimeout(() => setLoading(false), 0), [imageLoaded]);
	useHotkeys("s", () => setShowSearch((showSearch) => !showSearch));
	useHotkeys("b", () => setShowBookmarks((showBookmarks) => !showBookmarks));
	useHotkeys("esc", () => setShowInfo(false));
	useHotkeys("right", () => router.push(`/page/${page + 1}`));
	useHotkeys("left", () => router.push(`/page/${page - 1}`));
	
	useEffect(() => {
		if (pwaState === "controlling") {
			if(confirm(`New version ${version.ver} of app available. Restart now?`))
				window.location.reload();
		}
	}, [pwaState]);

	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<title>Cihenema</title>
			</Head>
			<main
				className={cn(s.container, s.scroll)}
				onClick={() => dispatch({action:UIAction.TOGGLE_INFO})}
			>
				<Gallery {...{ posts, setShowInfo, setImageLoaded, post }} />
				<InfoBox {...{ setShowInfo, showInfo:state.showInfo, post, setShowSearch, setShowBookmarks }} />
				<Pager {...{ nextPage, loading, page, setDeloading  }} />
				<Search {...{ showSearch, setShowSearch }} />
				<Bookmarks {...{ showBookmarks, setShowBookmarks }} />
				<Loader loading={loading} deloading={deloading} />
			</main>
		</>
	);
}

const getScrollMap = function (posts, height) {
	const totalHeight = posts.reduce((acc, curr) => acc + curr.images.length) * height;
	const scrollMap = {};
	let px = 0;
	posts.forEach((p, idx) => {
		for (let h = 0; h < p.images.length * height; h++, px++) 
			scrollMap[px] = idx;
	});
	return scrollMap;
};
