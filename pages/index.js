
import {TOTAL_PAGES} from '../db'
import Head from 'next/head'
import Link from 'next/link'
import styles from './index.module.scss'
import {useRouter} from "next/router";
import classes from 'classnames'

import {useEffect, useState, useReducer} from 'react'
const randomPageNumber = (totalPages) => Math.floor((Math.random()*totalPages))

export default function Home({totalPages}) {
  const randomPage = Math.ceil(Math.random()*totalPages)
  const router = useRouter()
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [disapear, setDisapear] = useState(false);
  const title = 'Cihenema';

  const onClick = (e) => {
    if(!start) return setStart(true)
    setStart(false)
    setEnd(true)
    setTimeout(()=>setDisapear(true), 2000)
    setTimeout(()=>router.push(`/new`), 4500)
  }
  useEffect(()=>router.prefetch('/new'), [])
  return (
      <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>{title}</title>  
      </Head>
      <main id="home" className={classes(styles.container, styles.home, {[styles.end] : end})} onClick={onClick} >
          <div class={classes(styles.homebg, {[styles.homebgfade] : end})}></div>
          <a 
            onClick={onClick} 
            className={ classes({[styles.animate] : start}, {[styles.disapear] : disapear})}
          >
            {[...title].map((c, idx)=> <span className={classes({[styles.ca]:end}, {[styles[`ca${idx}`]] : end})}>{c}</span>)}
          </a>
      </main>
    </>
  )
}

export async function getStaticProps(context) {
  return { 
    props: {
      totalPages:TOTAL_PAGES
    }
  }
}