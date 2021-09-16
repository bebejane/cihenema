import {db, TOTAL_PAGES, POSTS_PER_PAGE} from '@/lib/db'

export default function handler(req, res) {
  const p = !req.query.page || isNaN(req.query.page) ? 1 :  Array.isArray(req.query.page) ? req.query.page[0] : req.query.page
  const page = Math.min(Math.max(parseInt(p), 1), TOTAL_PAGES);
  const start = (page-1)*POSTS_PER_PAGE
  const end = start+POSTS_PER_PAGE
  const posts = db.slice(start,end)
  res.status(200).json(posts)
}