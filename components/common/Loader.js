import styles from "./Loader.module.scss";
import classes from "classnames";
import { useState, useEffect } from "react";
import { useWindowSize } from "@react-hook/window-size";

export default function Loader({ loading, deloading }) {
	const [loader, setLoader] = useState("loading");
	const [width, height] = useWindowSize();
	const noStripes = width > 768 ? 51 : 23;
	const curve = 0.02;
	const duration = 1000;
	const totalDuration = (duration / 1000) * (noStripes * curve);

	const stripes = new Array(noStripes).fill({}).map((s, i) => {
		const odd = i % 2 === 0;
		const color = odd ? "red" : "black";
		const deload = deloading ? (odd ? "slideinup" : "slideindown") : undefined;
		const animation = loader === "animate" ? (odd ? "slideoutup" : "slideoutdown") : undefined;
		return {
			color,
			animation: animation || deload,
			duration: (duration / 1000) * (deloading ? noStripes - i + 1 : i + 1) * curve + "s",
		};
	});

	useEffect(() => deloading && setLoader("deloading"), [deloading]);
	useEffect(() => {
		if (!loading && loader == "loading") {
			setLoader("animate");
			console.log("animate", totalDuration);
			setTimeout(() => setLoader("ready"), totalDuration * 1000);
		}
	}, [loading]);

	if (loader === "ready") return null;

	return (
		<div className={styles.loader}>
			{stripes.map((s, idx) => (
				<div
          key={idx}
					className={classes(styles.stripe, styles[s.color], styles[s.animation])}
					style={{ animationDuration: s.duration }}
				></div>
			))}
		</div>
	);
}

function Stripe({ color }) {
	const style = classnames(styles.stripe, styles[color]);
	return <div className={style}></div>;
}
