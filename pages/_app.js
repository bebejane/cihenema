import "../styles/global.scss";
import { motion } from "framer-motion";

export default function App({ Component, pageProps, router }) {
	
	return (
		<Component {...pageProps} key={router.asPath} />
	)
		
}
