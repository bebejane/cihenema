const WPAPI = require('wpapi');
const fs = require('fs');
//const { parse } = require('path');
const {decode} = require('html-entities');
const {parse } = require('node-html-parser');

const wp = new WPAPI({ endpoint: 'https://worldscinema.org/wp-json' });

const POSTS_PER_PAGE = 10;
const FILE_NAME = 'posts.json'
let db = fs.existsSync('./data/'+FILE_NAME) ? JSON.parse(fs.readFileSync('./data/'+FILE_NAME)) : []

function find(slug){
  for (let index = 0; index < db.length; index++) {
    const post = db[index];
    if(post.slug === slug)
      return post
  }
  return null;
}

function sleep (ms){
  return new Promise((resolve)=>{
    setTimeout(()=>resolve(), ms)
  })
}

async function scrape (){
  console.log('Importing data...')
  const lastPost = db.length ? db[0] : null;
  const data = [];
  let page = 1;

  while(true){
    try{
      let posts = await wp.posts().perPage(100).page(page);
      if(lastPost){
        posts = posts.filter((p)=>new Date(p.date) > new Date(lastPost.date));
        if(!posts.length){
          console.log('no more new posts')
          break;
        }
      }
      db.push.apply(db, posts)
      console.log(page, posts.length, db.length)
      page++
      await sleep(500)
    }catch(err){
      if(err.code == 'rest_post_invalid_page_number')
        break;
      else{
        console.error(err.message)
        process.exit(1) 
      }
    }
  }
  db = db.sort((a,b)=>new Date(a.date) > new Date(b.date));
  fs.writeFileSync('./data/'+FILE_NAME, JSON.stringify(db))
  parseDB()
  console.log('Done', db.length)
}


const parsePost = (p) => {
  
  const imdb = parseIMDB(p.content.rendered);
  const images = parseImages(p.content.rendered);
  const remove = ['[+Extra]', '[+Extras]', '(HD)', '[+ Extras]']
  
  

  let title = decode(p.title.rendered)
  remove.forEach(t => title = title.replace(t, ''))
  title = title.replace(/[.*]/g, '')

  let year = title.endsWith(')') ? title.substring(title.length-5, title.length-1) : undefined
  let director = title.includes(' – ') ? title.substring(0, title.indexOf(' – ')) : undefined;

  if(year) title = title.replace('('+year+')', '')
  if(director) title = title.replace(director + ' – ', '')
    
  let titleEnglish = title.match(/\ aka\ /gi) ? title.substring(title.toLowerCase().indexOf(' aka ') + 5) : undefined;
  
  if(titleEnglish)
    title = title.substring(0, title.toLowerCase().indexOf(' aka '))

  const post = {
    slug:p.slug,
    _title:decode(p.title.rendered),
    title:title,
    excerpt:decode(p.excerpt.rendered.replace('<p>', '').replace('</p>', '')),
    titleEnglish,
    director,
    imdb,
    year,
    ...images,
  }
  return post
}
const parseImages = function(html){
  html = html.replace(/\\"/g, '"')
  const root = parse(html);
  const images = root.querySelectorAll('img').map((i)=>i.getAttribute('src')).filter((i)=>i && !i.includes('29f7c043f76a2bde437fd0d52a185152.jpg'))
  return {
    images : images.slice(1).map(i => i.replace('http://', 'https://'))
  }
}
const parseIMDB = function(html){
  
  html = html.replace(/\\"/g, '"')
  var rex = /(?:ht|f)tps?:\/\/[-a-zA-Z0-9.]+\.[a-zA-Z]{2,3}(\/[^"<]*)?/g;
  var urls = []
  for (var m; m = rex.exec( html ); ){
    if(m[0].includes('imdb.com')){
      const p = m[0].split('/').filter(p => p)
      return p[p.length-1]
    }
  }
  return 
}
function parseDB(){
  console.log('Parsing posts...')
  const search = []
  let count = 0
  for (let index = 0; index < db.length; index++) {
    db[index] = parsePost(db[index])
    search.push({
      i: db[index].imdb, 
      ten: db[index].titleEnglish || '', 
      t: db[index].title || '', 
      d: db[index].director || '', 
      y: db[index].year || '',
      p: Math.ceil(index/POSTS_PER_PAGE)
    })
  }
  fs.writeFileSync('./data/_'+FILE_NAME, JSON.stringify(db))
  fs.writeFileSync('./public/movies.json', JSON.stringify(search))
  console.log('Done parsing posts...')

}
scrape()

