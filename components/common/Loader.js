import styles from './Loader.module.scss';

export default function Loader({loading}){
  if(!loading) return null
  return (
    <div className={styles.loader}></div>
  )
}