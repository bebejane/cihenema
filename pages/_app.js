import "../styles/global.scss";

export default function App({ Component, pageProps, router }) {
	return (
		<Component {...pageProps} key={router.asPath} />
	)		
}
