import {db, TOTAL_PAGES, POSTS_PER_PAGE} from '../../../db'
import Fuse from 'fuse.js'

const options = {
  includeScore: true,
  threshold: 0.0,
  keys: ['titleEnglish', 'title', 'year']
}
const f = new Fuse(db, options);

export default function handler(req, res) {
  const q = req.query.q;
  const posts =  f.search(q)
  res.status(200).json(posts.map(p => p.item))
}
