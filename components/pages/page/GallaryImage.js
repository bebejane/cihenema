import s from "./GalleryImage.module.scss";
import cn from "classnames";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const threshold = new Array(100).fill(0).map((x,t)=> t/100)

export default function GalleryImage({
	src,
	imdbId,
	index,
	imageIndex,
	setShowInfo,
	onLoad,
	onClick,
}) {

	const [effect, setEffect] = useState({})
	const { ref, inView, entry } = useInView({ threshold});
	const {intersectionRatio : ratio} = entry || {}

	useEffect(()=>{
		const scale = 1.0 + (ratio*0.1)
		const effect = {transform:`scale(${scale})`}
		setEffect(effect);
	}, [ratio])
	
	
	return (
		<div
			id={imdbId}
			key={index + "-" + imageIndex}
			ref={ref}
			className={cn(s.slide)}
			onClick={onClick}
		>
			<div className={s.wrap} >
				<img src={src} onLoad={onLoad} style={effect}/>
			</div>
		</div>
	);
}
