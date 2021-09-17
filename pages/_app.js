import "../styles/global.scss";
import { BookmarksProvider } from "@/lib/context/bookmarks";

export default function App({ Component, pageProps, router }) {
	return (
		<BookmarksProvider>
			<Component {...pageProps} key={router.asPath} />
		</BookmarksProvider>
	)		
}
