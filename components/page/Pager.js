import styles from './Pager.module.scss';
import Link from 'next/link';
import classes from 'classnames'

export default function Pager({handleLoad, nextPage, loading, page, heartbeat}){
  const buttonStyle = classes({[styles.heartbeat]:heartbeat})
  const loadingStyle = classes(styles["lds-hourglass"], styles.heartbeat)
  return (
    <div className={styles.pager} onClick={handleLoad}>
      <Link href={`/page/${nextPage}`}>
        <a>
          {!loading && <button className={buttonStyle}>{page}</button>}
          {loading && <div className={loadingStyle}></div>} 
        </a>
      </Link>
    </div>
  )
}