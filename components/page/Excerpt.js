import styles from './Excerpt.module.scss';
import Link from 'next/link';
import classes from 'classnames'

export default function Excerpt({showExcerpt, setShowExcerpt, posts, index }){
  return (
    <div className={classes(styles.excerpt, showExcerpt ? styles.toggled : '')}>
      {posts[index] && posts.length &&
        <>
          <div className={styles.name} >{(posts[index].titleEnglish || posts[index].title)}</div>
          <div className={styles.director}>{posts[index].director} · {posts[index].year}</div>
          <div className={styles.summary} onClick={ e => e.stopPropagation()}>
            <div >{posts[index].excerpt} {posts[index].titleEnglish && <span className={styles.nameorg}>aka: {posts[index].title}</span>}</div>
            <div className={styles.links} onClick={e => e.stopPropagation()}>
              { posts[index].imdb &&
                <Link href={'https://imdb.com/title/' + posts[index].imdb}>
                  <a target="_new">Imdb</a>
                </Link>
              }
              <Link href={`https://bitsearch.to/search?q=${(posts[index].titleEnglish || posts[index].title)} ${(posts[index].year || '')}`}>
                <a target="_new">Torrent</a>
              </Link>
              <Link href={`https://youtube.com/results?search_query=${(posts[index].titleEnglish || posts[index].title)} ${(posts[index].year || '')}`}>
                <a target="_new">Youtube</a>
              </Link>
            </div>
            <div className={styles.close} onClick={()=>setShowExcerpt(false)}>
              <img src={'/images/close.svg'}/>
            </div>
          </div>
        </>
      }
    </div>
  )
}