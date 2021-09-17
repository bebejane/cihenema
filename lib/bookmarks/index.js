const getBookmarks = () => {
  if(typeof window === 'undefined') return []
  let favs = localStorage.getItem("bookmarks") ? JSON.parse(localStorage.getItem("bookmarks")) : [];
  return favs.reverse();
}
const isBookmarked = (imdb) => {
	let favs = getBookmarks()
	return favs.filter(p => p.imdb === imdb).length > 0
}
const toggleBookmark = (post) => {
  let favs = getBookmarks()
  if (!isBookmarked(post.imdb)) 
    favs.push(post);
  else 
    favs = favs.filter(p => p.imdb !== post.imdb);

  localStorage.setItem("bookmarks", JSON.stringify(favs));
  
  return getBookmarks()
}
const deleteBookmark = (id) => {
  let favs = getBookmarks()
  favs = favs.filter(p => p.imdb !== id);
  localStorage.setItem("bookmarks", JSON.stringify(favs));
  return favs
}
export {
  getBookmarks,
  isBookmarked,
  toggleBookmark,
  deleteBookmark
}