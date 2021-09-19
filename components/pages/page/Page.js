import version from "/VERSION";
import s from "./Page.module.scss";
import cn from "classnames";
import Head from "next/head";

import { BookmarksProvider } from "@/lib/context/bookmarks";
import Loader from "@/components/common/Loader";
import InfoBox from "./InfoBox";
import Gallery from "./Gallery";
import Pager from "./Pager";
import Search from "./popups/Search";
import Bookmarks from "./popups/Bookmarks";

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

	const goToPage = (page) => {
		setDeloading(true)
		setTimeout(()=> router.push(`/page/${page}`), 1500)
	}
	useEffect(() => setScrollMap(getScrollMap(posts, height)), [height]);
	useEffect(() => setLoading(true), [page]);
	useEffect(() => imageLoaded && setTimeout(() => setLoading(false), 0), [imageLoaded]);
	
	useHotkeys("s", () =>  setUI({type:UIAction.TOGGLE_POPUP, popup:UIPopup.SEARCH}))
	useHotkeys("b", () =>   setUI({type:UIAction.TOGGLE_POPUP, popup:UIPopup.BOOKMARKS}))
	useHotkeys("esc", () => popup ? setUI({type:UIAction.HIDE_POPUP, popup}) : setUI({type:UIAction.HIDE_INFO}), [popup]);
	useHotkeys("right", () => goToPage(page + 1));
	useHotkeys("left", () => goToPage(page - 1));
	
	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<title>Cihenema</title>
			</Head>
			<main className={cn(s.container, s.scroll)}>
				<Loader loading={loading} deloading={deloading} />
				<Gallery {...{ posts, setImageLoaded, post }} />
				<Pager {...{ nextPage, loading, page, setDeloading, goToPage}} />
				<Search {...{goToPage}}/>
				<BookmarksProvider>
					<InfoBox {...{ post}} />
					<Bookmarks {...{goToPage}}/>
				</BookmarksProvider>
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
