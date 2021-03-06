import { createContext, useReducer, useContext } from 'react'
import { getBookmarks, isBookmarked, toggleBookmark, deleteBookmark} from '@/lib/bookmarks'

export const actionTypes = {
  DELETE:'DELETE',
  TOGGLE:'TOGGLE',
  ADD:'ADD'
}

const bookmarksReducer = (state, {type, id, post}) => {
 // console.log('reducer', state, action)
  switch (type) {
    case actionTypes.TOGGLE:
      return toggleBookmark(post)
    case actionTypes.DELETE:
      return deleteBookmark(id)
    default:
      return getBookmarks()
  } 
}

export const BookmarksContext = createContext()
export const BookmarksProvider = (props) => {
  const initialState = getBookmarks()
  const [bookmarks, dispatch] = useReducer(bookmarksReducer, initialState)
  const value = { bookmarks,  dispatch}
  return (
    <BookmarksContext.Provider value={value}>
      {props.children}
    </BookmarksContext.Provider>
  )
}

export const useBookmarks = () => {
  const context = useContext(BookmarksContext)
  return [context.bookmarks, context.dispatch]
}