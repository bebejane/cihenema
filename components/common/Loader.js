import s from "./Loader.module.scss";
import cn from "classnames";
import { useState, useEffect, useLayoutEffect} from "react";
import { useWindowSize } from "@react-hook/window-size";

export default function Loader({ loading, deloading }) {
	
	const [loader, setLoader] = useState("loading");
	const [stripes, setStripes] = useState([]);
	const [animated, setAnimated] = useState(0);
	const [width] = useWindowSize();
	const numStripes = width > 767 ? 51 : 23;
	const totalDuration = width > 767 ? 1000 : 2000;
	const curve = 0.02;
	
	(process.browser ? useLayoutEffect : useEffect)	(()=>{
		const stripes = new Array(numStripes).fill({}).map((s, i) => {
			const odd = i % 2 === 0;
			const color = odd ? "rgb(255,0,0)" : "rgb(0,0,0)";
			const animation = "slide" + (deloading ? odd ? "inup" : "indown" : odd ? "outup" : "outdown");
			const duration = (totalDuration / 1000) * (deloading ? numStripes - i + 1 : i + 1) * curve + "s";
			return { color, animation: loader !== "loading" ? animation : undefined , duration };
		});
		setStripes(stripes)
	}, [loader, width])

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
