import fs from 'fs'
import Head from 'next/head'
import styles from './home.module.scss'
import Link from "next/link";
import {useEffect, useState, useReducer} from 'react'
const randomPageNumber = (totalPages) => Math.floor((Math.random()*totalPages))

export default function Home({totalPages}) {
  return (
      <>
      <Head>
        <title>BebyJ</title>  
      </Head>
      <main id="home" className={[styles.container, styles.home].join(' ')}>
        <Link href={`/page/${randomPageNumber(totalPages)}`} onClick={()=>setLoading(true)}>
          <a>
            <div className={styles["lds-hourglass"]}></div>
          </a>
        </Link>
      </main>
    </>
  )
}

const POSTS_PER_PAGE = 10;
const DB_FILE = './data/_posts.json'
const db = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE)) : []

export async function getStaticProps(context) {
  
  return { 
    props: {
      totalPages:Math.ceil(db.length/10)
    }
  }
}