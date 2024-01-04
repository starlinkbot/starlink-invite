import React, { createContext, useReducer, useContext } from "react"
import reducer from "./reducer"

export const initState = {
  tEmail: "",
  tNewEmail: ""
}

const ConfigCtx = createContext(null)

export const Provider = props => {
  const [tState, tDispatch] = useReducer(reducer, initState)
  return <ConfigCtx.Provider value={{ tState, tDispatch }}>{ props.children }</ConfigCtx.Provider>
}

export const useTemporaryStore = () => useContext(ConfigCtx)