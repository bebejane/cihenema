import { useState, useEffect } from "react";
import styles from "./GalleryImage.module.scss";
import classes from "classnames";
import { useInView } from 'react-intersection-observer';

export default function GalleryImage({ src, imdbId, index, imageIndex, setShowInfo, onLoad, onClick}) {
  
  const { ref, inView } = useInView({threshold:0.5, });
  
	return(
    <div id={imdbId} key={index+ '-' + imageIndex} ref={ref} className={
      classes(
        styles.slide, 
        {[styles.entry]:inView}, 
        {[styles.exit]:!inView}
      )} 
      onClick={onClick}
    >
      <div className={styles.wrap}>
        <img src={src} onLoad={onLoad}/>
      </div>
    </div>
	)
}
