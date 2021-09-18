import { createContext, useReducer, useContext, useState } from 'react'

const initialState = {
  showInfo:false,
  showBookmarks:false,
  showSearch:false
}

export const UIAction = {
  SHOW_INFO:'SHOW_INFO',
  HIDE_INFO:'HIDE_INFO',
  TOGGLE_INFO:'TOGGLE_INFO',
  SHOW_BOOKMARKS:'SHOW_BOOKMARKS',
  HIDE_BOOKMARKS:'HIDE_BOOKMARKS',
  TOGGLE_BOOKMARKS:'TOGGLE_BOOKMARKS',
  SHOW_SEARCH:'SHOW_SEARCH',
  HIDE_SEARCH:'HIDE_SEARCH',
  TOGGLE_SEARCH:'TOGGLE_SEARCH',
}

const UIReducer = (state, {action}) => {
 // console.log('reducer', state, action)
  switch (action) {
    case UIAction.SHOW_BOOKMARKS:
      return {...state, showBookmarks:true}
    case UIAction.HIDE_BOOKMARKS:
      return {...state, showBookmarks:false}
    case UIAction.TOGGLE_BOOKMARKS:
      return {...state, showBookmarks:!state.showBookmarks}
    case UIAction.SHOW_SEARCH:
      return {...state, showSearch:true}
    case UIAction.HIDE_SEARCH:
      return {...state, showSearch:false}
    case UIAction.TOGGLE_SEARCH:
      return {...state, showSearch:!state.showSearch}
    case UIAction.SHOW_INFO:
      return {...state, showInfo:true}
    case UIAction.HIDE_INFO:
      return {...state, showInfo:true}
    case UIAction.TOGGLE_INFO:
      return {...state, showInfo:!state.showInfo}
    default:
      throw `Action ${type} not found`
  } 
}

export const UIContext = createContext()
export const UIProvider = (props) => {
  const [state, dispatch] = useReducer(UIReducer, initialState)
  const value = { state,  dispatch }
  return (
    <UIContext.Provider value={value}>
      {props.children}
    </UIContext.Provider>
  )
}
export const useUI = () => {
  const {state, dispatch} = useContext(UIContext)
  return [state, dispatch]
}