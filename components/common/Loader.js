import styles from "./Loader.module.scss";
import classes from "classnames";
import { useState, useEffect } from "react";
import { useWindowSize } from "@react-hook/window-size";
import Color from "color";

export default function Loader({ loading, deloading }) {
	const [loader, setLoader] = useState("loading");
	const [animated, setAnimated] = useState(0);
	const [width, height] = useWindowSize();
	const numStripes = width > 768 ? 51 : 23;
	const curve = 0.02;
	const duration = width > 768 ? 1000 : 2000;	

	const stripes = new Array(numStripes).fill({}).map((s, i) => {
		const odd = i % 2 === 0;
		const color = odd ? "rgb(255,0,0)" : "rgb(0,0,0)";
		const deload = deloading ? (odd ? "slideinup" : "slideindown") : undefined;
		const animation = loader === "animate" ? (odd ? "slideoutup" : "slideoutdown") : undefined;
		
		return {
			color,
			animation: animation || deload,
			duration: (duration / 1000) * (deloading ? numStripes - i + 1 : i + 1) * curve + "s",
		};
	});

	useEffect(() => deloading && setLoader("deloading"), [deloading]);
	useEffect(() => (!loading && loader == "loading") && setLoader("animate"), [loading]);
	useEffect(() => animated === numStripes && setLoader("done"), [animated]);

	if (loader === "done") return null;

	return (
		<div className={styles.loader} suppressHydrationWarning={true}>
			{stripes.map((s, idx) => (
				<div
          key={idx}
					className={classes(styles.stripe, styles[s.animation])}
					onAnimationEnd={(idx)=>setAnimated(animated+1)}
					style={{ animationDuration: s.duration, backgroundColor:s.color }}
				></div>
			))}
		</div>
	);
}

function Stripe({ color }) {
	const style = classnames(styles.stripe, styles[color]);
	return <div className={style}></div>;
}
