import styles from './Loader.module.scss';
import classes from 'classnames'
import { useState, useEffect } from 'react';
import { useWindowSize } from '@react-hook/window-size';

export default function Loader({loading, deloading}){

  const [loader, setLoader] = useState('loading')
  const [width, height] = useWindowSize();
  const noStripes = width > 768 ? 51 : 23;
  const duration = 1000;

  const stripes = new Array(noStripes).fill({}).map((s, i)=> { 
    const odd = i % 2 === 0
    const color = odd ? 'red' : 'black'
    const deload = deloading  ? odd ? 'slideinup' : 'slideindown' : undefined
    const animation = loader === 'animate' ?  odd ? 'slideoutup' : 'slideoutdown' : undefined
    
    return {
      color,
      animation : animation || deload
    } 
  });

  useEffect(()=> deloading && setLoader('deloading'), [deloading])
  useEffect(()=>{
    if(!loading && loader == 'loading'){
      setLoader('animate')
      setTimeout(()=>setLoader('ready'), duration*2)
    }
  }, [loading])
  if(loader === 'ready') return null

  return (
    <div className={styles.loader}>
      {stripes.map((s, idx)=>
        <div 
          className={classes(styles.stripe, styles[s.color], styles[s.animation])}
          style={{animationDuration: duration/1000 + 's' }}
        ></div>
      )}
    </div>
  )
}

function Stripe({color}){
  const style = classnames(styles.stripe, styles[color])
  return (
    <div className={style}></div>
  )
}