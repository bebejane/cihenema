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