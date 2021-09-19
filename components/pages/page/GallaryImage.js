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

	const [effect, setEffect] = useState(undefined)
	const { ref, inView, entry } = useInView({ threshold});
	const {intersectionRatio : ratio} = entry || {}
	
	useEffect(()=>{
		const scale = 1.0 + (ratio*0.1)
		const effect = {transform:`scale(${scale})`}
		setEffect(effect);
	}, [ratio])
	
	//if(ratio === undefined) return null

	return (
		<section
			key={index + "-" + imageIndex}
			id={imdbId}
			className={cn(s.slide)}
			ref={ref}
			onClick={onClick}
		>
			<div className={s.wrap} >
				<img 
					src={src} 
					onLoad={onLoad} 
					style={effect}
				/>
			</div>
		</section>
	);
}
