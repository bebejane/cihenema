import fs from 'fs'
export const DB_FILE = './data/_posts.json'
export const POSTS_PER_PAGE = 10;
export const db = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE)) : []
export const TOTAL_PAGES = Math.ceil(db.length/POSTS_PER_PAGE);

export function getPosts(page, perPage = POSTS_PER_PAGE){
  perPage = isNaN(perPage) ? POSTS_PER_PAGE : parseInt(perPage);
  const start = (page-1)*perPage
  return  db.slice(start, start+perPage)
} 
