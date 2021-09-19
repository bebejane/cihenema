import version from "/VERSION";
import s from "./Page.module.scss";
import cn from "classnames";

import Loader from "@/components/common/Loader";
import InfoBox from "./InfoBox";
import Gallery from "./Gallery";
import Pager from "./Pager";
import Search from "./popups/Search";
import Bookmarks from "./popups/Bookmarks";

import Head from "next/head";

import { useUI, UIAction, UIPopup } from "@/lib/context/ui";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useWindowSize } from "@react-hook/window-size";
import { useHotkeys } from "react-hotkeys-hook";
import usePWA from "@/lib/hooks/usePWA";
import useScrollPosition from "@react-hook/window-scroll";


export default function Page({ posts, images, page, totalPages, newest }) {

	const [{showInfo, popup}, setUI] = useUI();
	const router = useRouter();
	const [nextPage] = useState(Math.floor(Math.random() * totalPages));
	const [loading, setLoading] = useState(true);
	const [deloading, setDeloading] = useState(false);
	const [scrollMap, setScrollMap] = useState({});
	const [imageLoaded, setImageLoaded] = useState(false);
	const [width, height] = useWindowSize();
	const [pwaState] = usePWA(true);
	const scrollY = useScrollPosition(30);
	const post = posts[scrollMap[Math.floor(scrollY + height / 2)]]

	useEffect(() => setScrollMap(getScrollMap(posts, height)), [height]);
	useEffect(() => setLoading(true), [page]);
	useEffect(() => imageLoaded && setTimeout(() => setLoading(false), 0), [imageLoaded]);
	useHotkeys("s", () =>  setUI({type:UIAction.TOGGLE_POPUP, popup:UIPopup.SEARCH}))
	useHotkeys("b", () =>   setUI({type:UIAction.TOGGLE_POPUP, popup:UIPopup.BOOKMARKS}))
	useHotkeys("esc", () => popup ? setUI({type:UIAction.HIDE_POPUP, popup}) : setUI({type:UIAction.HIDE_INFO}), [popup]);
	useHotkeys("right", () => router.push(`/page/${page + 1}`));
	useHotkeys("left", () => router.push(`/page/${page - 1}`));
	
	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<title>Cihenema</title>
			</Head>
			<main className={cn(s.container, s.scroll)}>
				<Gallery {...{ posts, setImageLoaded, post }} />
				<InfoBox {...{ post}} />
				<Pager {...{ nextPage, loading, page, setDeloading  }} />
				<Search />
				<Bookmarks />
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
