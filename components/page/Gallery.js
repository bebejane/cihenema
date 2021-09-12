import styles from './Gallery.module.scss';
import Link from 'next/link';
import classes from 'classnames'

export default function Gallery({posts, setShowExcerpt, setImageLoaded}){
  return (
    posts.map((post, pidx)=>{
      return post.images.map((img, idx)=> 
        <div id={idx === 0 ? post.imdb : ''} className={styles.slide} key={idx} onClick={()=>setShowExcerpt(false)}>
          <div className={styles.wrap}>
            <img loading={pidx== 0 && idx < 2 ? '' : ''} onLoad={()=>setImageLoaded(pidx== 0 && idx == 0)}  src={img}/>
          </div>
        </div>
      )
    })
  )
}