import "../styles/global.scss";
import { BookmarksProvider } from "@/lib/context/bookmarks";
import { motion } from "framer-motion";

export default function App({ Component, pageProps, router }) {
	return (
		<BookmarksProvider>
			<Component {...pageProps} key={router.asPath} />
		</BookmarksProvider>
	)		
}
