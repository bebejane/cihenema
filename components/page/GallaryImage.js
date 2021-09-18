import { useState, useEffect } from "react";
import styles from "./GalleryImage.module.scss";
import classes from "classnames";
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
		const scale = 1.0 + (ratio*0.2)
		const effect = {transform:`scale(${scale})`}
		setEffect(effect);
	}, [ratio])
	
	
	return (
		<div
			id={imdbId}
			key={index + "-" + imageIndex}
			ref={ref}
			className={classes(styles.slide)}
			onClick={onClick}
		>
			<div className={styles.wrap} >
				<img src={src} onLoad={onLoad} style={effect}/>
			</div>
		</div>
	);
}
