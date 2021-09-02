import { createContext, useReducer } from 'react'

const colorReducer = (state, action) => {
  switch (action.type) {
    case colorTypes.BLACK:
      return colorTypes.BLACK
    case types.PURPLE:
      return colorTypes.PURPLE
  } 
}
const colorCycler = (state, action) => {
  const colors = Object.keys(colorTypes)
  const idx = colors.findIndex(c => colorTypes[c] === state)+1
  const color = colorTypes[colors[idx+1 > colors.length ? 0 : idx]]
  return color
}

export const colorTypes = {
  BLACK: '#000',
  PURPLE: 'purple',
  RED: 'red',
  GREEN: 'green'
}

export const colorContext = createContext()
export const ColorProvider = (props) => {
  const [color, cycleColor] = useReducer(colorCycler, colorTypes.BLACK)
  const value = { color, cycleColor }
  return (
    <colorContext.Provider value={value}>
      {props.children}
    </colorContext.Provider>
  )
}