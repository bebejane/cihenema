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
	const { ref, inView, entry } = useInView({ threshold});
	const r = entry ? entry.intersectionRatio : 0
	const scale = 1.0 + (r*0.2)
	const effect = {transform:`scale(${scale})`}
	
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
