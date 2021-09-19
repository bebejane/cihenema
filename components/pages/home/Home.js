import s from "./Home.module.scss";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {Loader} from "@/components/common";
import Link from "next/link";
import Head from "next/head";
import usePWA from "@/lib/hooks/usePWA";

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
	const [pwaState] = usePWA(true);
	const [randomPage] = useState(Math.ceil(Math.random() * totalPages));
	const router = useRouter();
	const [renderKey, setRenderKey] = useState(1);
	const title = "Cihenema";

	const onClick = (e) => {
		router.push(`/page/${randomPage}`)
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
				<main className={cn(s.container)} onClick={onClick}>
					<motion.div
						key={renderKey}
						initial="hidden"
						animate={introAnimation}
						style={{scale:0}}
						transition={{ delay:0.5, duration, ease: "easeOut"}}
						onClick={onClick}
					>
						{[...title].map((char, idx) => (
							<span
								key={idx}
								className={cn({[s.ca]: true }, {[s[`ca${idx}`]]: true })}
							>
								{char}
							</span>
						))}
					</motion.div>
				</main>
			</Link>
			<Loader loading={true} />
		</>
	);
}
