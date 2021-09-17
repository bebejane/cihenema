import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/common/Loader";
import Link from "next/link";
import Head from "next/head";
import usePWA from "@/lib/hooks/usePWA";
import styles from "./index.module.scss";
import classes from "classnames";
import { motion, useMotionValue } from "framer-motion";

const introAnimation = {
	scale: [0, 1, 0.9, 0.9, 0.1, 0.08],
	rotate: [0, 0, 0, 0, 0, 0, -90, -90, -90, -90, -90],
	color: [
		"rgb(255,0,0)",
		"rgb(255,0,0)",
		"rgb(0,0,0)",
		"rgb(0,0,0)",
		"rgb(0,0,0)",
		"rgb(255,255,255)",
		"rgb(255,255,255)",
		"rgb(255,255,255)",
	],
	y: [0, 0, 0, 0, 0, 0, 0, 0, -2000],
};

const duration = 6;

export default function Home({ totalPages }) {
	const [pwa] = usePWA();
	const [randomPage] = useState(Math.ceil(Math.random() * totalPages));
	const router = useRouter();
	const [renderKey, setRenderKey] = useState(1);
	const title = "Cihenema";

	const onClick = (e) => {
		//router.push(`/page/${randomPage}`)
		//setRenderKey(Math.random())
	};
	useEffect(() => {
		setTimeout(() => router.push(`/page/${randomPage}`), duration * 1000 + 300);
	}, []);
	
	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/favicon.png" />
				<title>{title}</title>
			</Head>
			<Link href={`/page/${randomPage}`}>
				<main className={classes(styles.container)} onClick={onClick}>
					<motion.div
						key={renderKey}
						initial="hidden"
						animate={introAnimation}
						style={{scale:0}}
						transition={{ delay:0.5, duration, ease: "easeOut", staggerChildren: 0.3 }}
						onClick={onClick}
					>
						{[...title].map((c, idx) => (
							<span
								key={idx}
								className={classes({ [styles.ca]: true }, { [styles[`ca${idx}`]]: true })}
							>
								{c}
							</span>
						))}
					</motion.div>
				</main>
			</Link>
			<Loader loading={true} />
		</>
	);
}
