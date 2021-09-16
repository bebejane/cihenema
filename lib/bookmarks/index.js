const getBookmarks = () => {
  let favs = localStorage.getItem("Bookmarks") ? JSON.parse(localStorage.getItem("Bookmarks")) : [];
  return favs;
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

  localStorage.setItem("Bookmarks", JSON.stringify(favs));
}

export {
  getBookmarks,
  isBookmarked,
  toggleBookmark
}