import fs from 'fs'
import {useEffect, useState, useReducer} from 'react'
import Head from 'next/head'
import styles from '../home.module.scss'
import Link from "next/link";
import useScrollPosition from '@react-hook/window-scroll'
import { useWindowSize } from '@react-hook/window-size'

const sleep = (ms) => {return new Promise((resolve)=>{setTimeout(()=>resolve(), ms)})}

const currentIndex = function(posts, scrollY, height){
  const slide = scrollY/height;
  let index = 0;

  for (let p = 0, i=0, y=0; p < posts.length; p++) {
    const start = y;
    const end = start + (posts[p].images.length*height)
    if(scrollY >= start && scrollY <= end)
      index = p;  
    y += (posts[p].images.length*height)
  }
  return index
}
export default function Cinema({posts, page, totalPages}) {
  
  const randomPageNumber = () => Math.floor((Math.random()*totalPages))
  const [loading, setLoading] = useState(true);
  const [showExcerpt, setShowExcerpt] = useState(false);
  const [index, setIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const scrollY = useScrollPosition(60)
  const [width, height] = useWindowSize()
  const idx = currentIndex(posts, scrollY, height);
  
  if( idx != index && idx < posts.length) setIndex(idx)
  
  useEffect(async ()=>{setLoading(true)}, [page])
  useEffect(async ()=>{
      setTimeout(()=>setLoading(false),1000)
  }, [imageLoaded])
  
  const handleLoad  = (e) => {
    setShowExcerpt(false)
    setLoading(true)
    preventClick(e)
  }
  const preventClick  = (e) => {
    e.stopPropagation()
  }

  return (
      <>
      <Head>
        <title>BebyJ</title>  
      </Head>
      <main className={[styles.container, styles.scroll].join(' ')} onClick={()=>setShowExcerpt(!showExcerpt)}>
        <div className={styles.pager} onClick={handleLoad}>
          <Link href={`/page/${randomPageNumber()}`}>
            <a>
              {!loading && <button>{page}</button>}
              {loading && <div className={styles["lds-hourglass"]}></div>} 
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
                <div className={styles.name}>{(posts[index].titleEnglish || posts[index].title)}</div>
                <div className={styles.director}>{posts[index].director} · {posts[index].year}</div>
                {showExcerpt &&
                  <div className={styles.excerpt}>
                    <div>{posts[index].excerpt}</div>
                    {posts[index].titleEnglish && <div className={styles.nameorg}>AKA: {posts[index].title}</div>}
                    <div className={styles.links} onClick={preventClick}>
                      <Link href={posts[index].imdb ?  'https://imdb.com/title/' + posts[index].imdb : '#'}>
                        <a target="_new">IMDB</a>
                      </Link>
                      <Link href={`https://bitsearch.to/search?q=${(posts[index].titleEnglish || posts[index].title)} ${(posts[index].year || '')}`}>
                        <a target="_new">TORRENT</a>
                      </Link>
                      <Link href={`https://youtube.com/results?search_query=${(posts[index].titleEnglish || posts[index].title)} ${(posts[index].year || '')}`}>
                        <a target="_new">YOUTUBE</a>
                      </Link>
                      <Link href={`https://worldscinema.org/post/${posts[index].slug}`}>
                        <a target="_new">COTW</a>
                      </Link>
                    </div>
                  </div>
                }
              </>
            }
          </div>
          {posts.length && posts.map((post, pidx)=>{
            return post.images.map((img, idx)=> 
              <div className={styles.slide} key={idx} onClick={()=>setShowExcerpt(false)}>
                <div className={styles.wrap}><img loading={pidx== 0 && idx < 2 ? 'eager' : 'lazy'} onLoad={()=>setImageLoaded(pidx== 0 && idx == 0)}  src={img}/></div>
              </div>
            )
          })}
        }
      </main>
    </>
  )
}

const POSTS_PER_PAGE = 10;
const DB_FILE = './data/_posts.json'
const db = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE)) : []

function getPosts(page, perPage = POSTS_PER_PAGE){
  perPage = isNaN(perPage) ? POSTS_PER_PAGE : parseInt(perPage);
  const start = (page-1)*perPage
  return db.slice(start, start+perPage)
} 

export async function getStaticPaths() {
  
  const totalPages  = Math.ceil(db.length / POSTS_PER_PAGE);
  const paths = []

  for (let index = 0; index < totalPages; index++)
    paths.push({ params: { "page": [''+(index+1)]}})
  
  return {
    paths:paths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const page = parseInt(context.params.page[0])
  return { 
    props: {
      posts:getPosts(page) || [],
      page,
      totalPages:Math.ceil(db.length/POSTS_PER_PAGE)
    }
  }
}


