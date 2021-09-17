import { createContext, useReducer } from 'react'
import { getBookmarks, isBookmarked, toggleBookmark, deleteBookmark} from '@/lib/bookmarks'

const actionTypes = {
  DELETE:'DELETE',
  TOGGLE:'TOGGLE',
  ADD:'ADD'
}

const bookmarksReducer = (state, action) => {
 // console.log('reducer', state, action)
  switch (action.type) {
    case actionTypes.TOGGLE:
      return toggleBookmark(action.post)
    case actionTypes.DELETE:
      return deleteBookmark(action.id)
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