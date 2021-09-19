import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'

export default function useSearch(){
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
      threshold: 0.0,
      keys: ['ten', 'd', 'y']
    }
    const fuse = new Fuse(m, options);
    setFuse(fuse) 
  }, [])

  const setSearch = async (q) => {
    setResult({q, result:[]})
    clearTimeout(to)
    const timeout = setTimeout(()=>setResult({q, result:fuse && q ? fuse.search(q).slice(0, MAX_RESULT) : []}),250)
    setTo(timeout)
  }
  return [result, setSearch]
}