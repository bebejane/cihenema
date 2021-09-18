import "../styles/global.scss";
import { BookmarksProvider } from "@/lib/context/bookmarks";
import { UIProvider } from "@/lib/context/ui";

import { motion } from "framer-motion";

export default function App({ Component, pageProps, router }) {
	return (
		<UIProvider>
			<BookmarksProvider>
				<Component {...pageProps} key={router.asPath} />
			</BookmarksProvider>
		</UIProvider>
	)		
}
