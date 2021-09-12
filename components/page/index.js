import {useEffect, useState, useRef} from 'react'
import Search from './Search'
import Excerpt from './Excerpt'
import Gallery from './Gallery'
import Pager from './Pager'
import usePWA from '@/lib/hooks/usePWA';
import useSearch from '@/lib/hooks/useSearch';

import useScrollPosition from '@react-hook/window-scroll'
import { useWindowSize } from '@react-hook/window-size'
import { useHotkeys } from  'react-hotkeys-hook'
import styles from './index.module.scss'
import Head from 'next/head'
import classes from 'classnames'

export default function Page({posts, images, page, totalPages, newest}) {
  const [pwa] = usePWA()
  const searchRef = useRef()
  const [nextPage] = useState(Math.floor((Math.random()*totalPages)));
  const [loading, setLoading] = useState(true);
  const [showExcerpt, setShowExcerpt] = useState(false);
  const [index, setIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [heartbeat, setHeartbeat] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const scrollY = useScrollPosition(30)
  const [width, height] = useWindowSize()
  const [search, setSearch] = useSearch()

  const idx = currentIndex(posts, scrollY, height);
  
  if( idx != index && idx < posts.length) 
    setIndex(idx)
  if(scrollY > ((height*images)-(height*3)) && !heartbeat) 
    setHeartbeat(true)
  
  useEffect(()=>window.scrollTo(0,1), [])
  useEffect(async () => setLoading(true), [page])
  useEffect(async () => imageLoaded && setTimeout(()=>setLoading(false),500), [imageLoaded])
  useEffect(async () => setTimeout(()=>setHeartbeat(true),60000), [])
  useHotkeys('s', ()=> setToggleSearch(toggleSearch => !toggleSearch))

  const handleLoad  = (e) => {
    preventClick(e)
  }
  const preventClick  = (e) => {
    e.stopPropagation()
  }
  const handleToggleSearch  = (e) => {
    setToggleSearch(!toggleSearch)
    //searchRef.current.focus()
  }
  
  return (
      <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Cihenema</title>  
      </Head>
      <main className={classes(styles.container, styles.scroll)} onClick={()=>setShowExcerpt(!showExcerpt)}>
        <Search {...{search, searchRef, toggleSearch, setToggleSearch, setSearch}} onClick={preventClick}/>
        <Pager {...{nextPage, loading, page, heartbeat}}/>
        <Excerpt {...{setShowExcerpt, showExcerpt, posts, index}}/>
        <Gallery {...{posts, setShowExcerpt, setImageLoaded}}/>
        {loading && <div className={styles.loader}></div>}
      </main>
    </>
  )
}

const currentIndex = function(posts, scrollY, height){
  const slide = scrollY/height;
  let index = 0;

  for (let p = 0, i=0, y=0; p < posts.length; p++) {
    const start = y;
    const end = start + (posts[p].images.length*height)
    if(scrollY >= (start-(height*0.3)) && scrollY <= end)
      index = p;  
    y += (posts[p].images.length*height)
  }
  return index
}