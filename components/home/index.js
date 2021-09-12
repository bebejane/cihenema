import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import usePWA from "@/lib/hooks/usePWA";
import styles from "./index.module.scss";
import classes from "classnames";

export default function Home({ totalPages }) {
	const [pwa] = usePWA();
	const [randomPage] = useState(Math.ceil(Math.random() * totalPages));
	const router = useRouter();
	const [start, setStart] = useState(false);
	const [end, setEnd] = useState(false);
	const [disapear, setDisapear] = useState(false);
	const title = "Cihenema";

	const onClick = (e) => {
		if (!start) return setStart(true);
		setStart(false);
		setEnd(true);
		setTimeout(() => setDisapear(true), 2000);
		setTimeout(() => router.push(`/page/${randomPage}`), 4500);
	};
	useEffect(() => router.prefetch(`/page/${randomPage}`), []);

	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/favicon.png" />
				<title>{title}</title>
			</Head>
			<main id="home" className={classes(styles.container, styles.home, { [styles.end]: end })} onClick={onClick}>
				<div className={classes(styles.homebg, { [styles.homebgfade]: end })}></div>
				<a onClick={onClick} className={classes({ [styles.animate]: start }, { [styles.disapear]: disapear })}>
					{[...title].map((c, idx) => (
						<span key={idx} className={classes({ [styles.ca]: end }, { [styles[`ca${idx}`]]: end })}>
							{c}
						</span>
					))}
				</a>
			</main>
		</>
	);
}
