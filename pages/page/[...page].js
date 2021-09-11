import {getPosts, TOTAL_PAGES } from '../../db'
import {useEffect, useState, useRef} from 'react'
import Head from 'next/head'
import styles from './page.module.scss'
import Link from "next/link";
import useScrollPosition from '@react-hook/window-scroll'
import { useWindowSize } from '@react-hook/window-size'
import classes from 'classnames'
import Fuse from 'fuse.js'
import Router from 'next/router'
import {useHotkeys} from  'react-hotkeys-hook'

export default function Cinema({posts, images, page, totalPages, newest}) {
  
  const searchRef = useRef()
  const [nextPage] = useState(Math.floor((Math.random()*totalPages)));
  const [loading, setLoading] = useState(true);
  const [showExcerpt, setShowExcerpt] = useState(false);
  const [index, setIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [heartbeat, setHeartbeat] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const scrollY = useScrollPosition(60)
  const [width, height] = useWindowSize()
  const [search, setSearch] = useSearch()
  const idx = currentIndex(posts, scrollY, height);
  
  if( idx != index && idx < posts.length) 
    setIndex(idx)
  if(scrollY > ((height*images)-(height*3)) && !heartbeat) 
    setHeartbeat(true)
  
  useEffect(async () => setLoading(true), [page])
  useEffect(async () => setTimeout(()=>setLoading(false),1000), [imageLoaded])
  useEffect(async () => setTimeout(()=>setHeartbeat(true),60000), [])

  useHotkeys('s', ()=> setToggleSearch(toggleSearch => !toggleSearch))

  const handleLoad  = (e) => {
    preventClick(e)
  }
  const preventClick  = (e) => {
    e.stopPropagation()
  }
  const handleSearch  = (e) => {
    setSearch(e.target.value)
  }
  const handleToggleSearch  = (e) => {
    setToggleSearch(!toggleSearch)
    //searchRef.current.focus()
  }
  
  return (
      <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Cihenema</title>  
      </Head>
      <main className={classes(styles.container, styles.scroll)} onClick={()=>setShowExcerpt(!showExcerpt)}>
        <div className={classes(styles.search, {[styles.toggled]:toggleSearch})} onClick={preventClick}>
          
          <form className={styles.searchForm} onSubmit={(e)=> e.preventDefault()}>
            <input ref={searchRef} placeholder={'Search...'} type="text" onChange={handleSearch} value={search.q}/>
            <div className={styles.reset} onClick={()=>setSearch('')}>×</div>
            <div className={classes(styles.searchToggle, {[styles.toggled]:toggleSearch})} onClick={handleToggleSearch}>➤</div>
          </form>
          <div className={styles.results} >
          {search.result.map((m)=>
            <div className={styles.item} >
              <Link href={`/page/${m.item.p}#${m.item.i}`} onClick={handleLoad} prefetch={true}>
                <a>
                <div className={styles.title}>
                  {m.item.ten || m.item.t}
                  <div className={styles.director}>{m.item.d}</div>
                </div>
                <div className={styles.year}>{m.item.y}</div>
                </a>
              </Link>
            </div>
          )}
          </div>
        </div>
        <div className={styles.pager} onClick={handleLoad}>
          <Link href={`/page/${nextPage}`}>
            <a>
              {!loading && <button className={classes({[styles.heartbeat]:heartbeat})}>{newest ? 'NEW' : page}</button>}
              {loading && <div className={classes(styles["lds-hourglass"], styles["heartbeat"])}></div>} 
            </a>
          </Link>
        </div>
          {loading && <div className={styles.loader}></div>}
          <div className={styles.icons}>
            {posts.length && !showExcerpt && posts[index] && (posts[index].titleEnglish || posts[index].title) &&
              <>
              <Link href={`https://bitsearch.to/search?q=${(posts[index].titleEnglish || posts[index].title)} ${(posts[index].year || '')}`}>
                <a target="_new"><img src="/images/bittorrent.png"/></a>
              </Link>
              <Link href={posts[index].imdb ?  'https://imdb.com/title/' + posts[index].imdb : '#'}>
                <a target="_new"><img  src="/images/imdb-logo.png"/></a>
              </Link>
              </>
            }
          </div>
          <div className={[styles.imdb, showExcerpt ? styles['toggled'] : ''].join(' ')}>
            {posts[index] && posts.length &&
              <>
                <div className={styles.name} >{(posts[index].titleEnglish || posts[index].title)}</div>
                <div className={styles.director}>{posts[index].director} · {posts[index].year}</div>
                <div className={styles.excerpt} onClick={preventClick}>
                  <div >{posts[index].excerpt} {posts[index].titleEnglish && <span className={styles.nameorg}>aka: {posts[index].title}</span>}</div>
                  <div className={styles.links} onClick={preventClick}>
                    { posts[index].imdb &&
                      <Link href={'https://imdb.com/title/' + posts[index].imdb}>
                        <a target="_new">IMDB</a>
                      </Link>
                    }
                    <Link href={`https://bitsearch.to/search?q=${(posts[index].titleEnglish || posts[index].title)} ${(posts[index].year || '')}`}>
                      <a target="_new">Torrent</a>
                    </Link>
                    <Link href={`https://youtube.com/results?search_query=${(posts[index].titleEnglish || posts[index].title)} ${(posts[index].year || '')}`}>
                      <a target="_new">Youtube</a>
                    </Link>
                  </div>
                  <div className={styles.close} onClick={()=>setShowExcerpt(false)}>×</div>
                </div>
                
              </>
            }
          </div>
          {posts.length && posts.map((post, pidx)=>{
            return post.images.map((img, idx)=> 
              <div id={idx === 0 ? post.imdb : ''} className={styles.slide} key={idx} onClick={()=>setShowExcerpt(false)}>
                <div className={styles.wrap}>
                  <img loading={pidx== 0 && idx < 2 ? '' : ''} onLoad={()=>setImageLoaded(pidx== 0 && idx == 0)}  src={img}/>
                </div>
              </div>
            )
          })}
      </main>
    </>
  )
}


const useSearch = () => {
  const [result, setResult] = useState({q:'', result:[]})
  const [fuse, setFuse] = useState(undefined)
  const [movies, setMovies] = useState([])
  const [to, setTo] = useState(null)
  const MAX_RESULT = 30;

  useEffect(async ()=>{
    const res = await fetch('/movies.json')
    const m = await res.json()
    const options = {
      includeScore: true,
      keys: ['ten', 'd', 'y']
    }
    setFuse(new Fuse(m, options)) 
  }, [])

  const setSearch = async (q) => {
    setResult({q, result:[]})
    clearTimeout(to)
    const timeout = setTimeout(()=>setResult({q, result:fuse && q ? fuse.search(q).slice(0, MAX_RESULT) : []}),250)
    setTo(timeout)
  }
  return [result, setSearch]
}

const sleep = (ms) => {return new Promise((resolve)=>{setTimeout(()=>resolve(), ms)})}

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

export async function getStaticPaths() {
  const paths = []

  for (let index = 0; index < TOTAL_PAGES; index++)
    paths.push({ params: { "page": [''+(index+1)]}})
  
  return {
    paths:paths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const page = parseInt(context.params && context.params.page ? context.params.page[0] : 1)
  const posts = getPosts(page)
  const images = posts.reduce((acc, p) => acc+p.images.length, 0);
  
  return { 
    props: {
      posts,
      images,
      page,
      totalPages:TOTAL_PAGES
    }
  }
}


