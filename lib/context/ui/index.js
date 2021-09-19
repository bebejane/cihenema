import { createContext, useReducer, useContext, useState } from 'react'

const initialState = {
  showInfo:false,
  popup:undefined
}

export const UIAction = {
  SHOW_INFO:'SHOW_INFO',
  HIDE_INFO:'HIDE_INFO',
  TOGGLE_INFO:'TOGGLE_INFO',
  SHOW_POPUP:'SHOW_POPUP',
  HIDE_POPUP:'HIDE_POPUP',
  TOGGLE_POPUP:'TOGGLE_POPUP'
}

export const UIPopup = {
  BOOKMARKS:'BOOKMARKS',
  SEARCH:'SEARCH'
}

const UIReducer = (state, action) => {
  //console.log('reducer', state, action)
  switch (action.type) {
    case UIAction.SHOW_INFO:
      return {...state, showInfo:true}
    case UIAction.HIDE_INFO:
      return {...state, showInfo:false}
    case UIAction.TOGGLE_INFO:
      return {...state, showInfo:!state.showInfo}
    case UIAction.SHOW_POPUP:
      return {...state, popup:action.popup}
    case UIAction.HIDE_POPUP:
      return {...state, popup:undefined}
    case UIAction.TOGGLE_POPUP:
      return {...state, popup: state.popup === action.popup ? undefined : action.popup}
    default:
      throw `Action ${type} not found`
  } 
}

export const UIContext = createContext()
export const UIProvider = (props) => {
  const [state, dispatch] = useReducer(UIReducer, initialState)
  const value = { state,  dispatch }
  return (
    <UIContext.Provider value={value} {...props}>
      {props.children}
    </UIContext.Provider>
  )
}
export const useUI = () => {
  const {state, dispatch} = useContext(UIContext)
  return [state, dispatch]
}