import "/styles/global.scss";
import { UIProvider } from "@/lib/context/ui";

export default function App({ Component, pageProps, router }) {
	
	return (
		<UIProvider>
			<Component {...pageProps} key={router.asPath} />
		</UIProvider>
	)		
}
