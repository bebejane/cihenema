import s from "./Loader.module.scss";
import cn from "classnames";
import { useState, useEffect } from "react";
import { useWindowSize } from "@react-hook/window-size";

export default function Loader({ loading, deloading }) {
	
	const [loader, setLoader] = useState("loading");
	const [animated, setAnimated] = useState(0);
	const [width, height] = useWindowSize();
	const numStripes = width > 768 ? 51 : 23;
	const totalDuration = width > 768 ? 1000 : 2000;
	const curve = 0.02;

	const stripes = new Array(numStripes).fill({}).map((s, i) => {
		const odd = i % 2 === 0;
		const color = odd ? "rgb(255,0,0)" : "rgb(0,0,0)";
		const animation = deloading ? odd ? "slideinup" : "slideindown" : odd ? "slideoutup" : "slideoutdown";
		const duration = (totalDuration / 1000) * (deloading ? numStripes - i + 1 : i + 1) * curve + "s";
		return { color, animation: loader !== "loading" ? animation : undefined , duration };
	});

	useEffect(() => deloading && setLoader("deloading"), [deloading]);
	useEffect(() => animated === numStripes && setLoader("done"), [animated]);
	useEffect(() => !loading && loader != "done" && setLoader("deloading"), [loading]);

	if (loader === "done") return null;

	return (
		<div className={s.loader} suppressHydrationWarning={true}>
			{stripes.map((stripe, idx) => (
				<div
					key={idx}
					className={cn(s.stripe, s[stripe.animation])}
					onAnimationEnd={(idx) => setAnimated(animated + 1)}
					style={{ animationDuration: stripe.duration, backgroundColor: stripe.color }}
				></div>
			))}
		</div>
	);
}
