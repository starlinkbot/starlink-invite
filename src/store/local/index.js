import React, { createContext, useReducer, useContext } from "react"
import reducer from "./reducer"
import { storage } from "@/util"

export const initState = {
  lCode: storage.getl("lCode"),
}

const ConfigCtx = createContext(null)

export const Provider = props => {
  const [lState, lDispatch] = useReducer(reducer, initState)
  return <ConfigCtx.Provider value={{ lState, lDispatch }}>{ props.children }</ConfigCtx.Provider>
}

export const useLocalStore = () => useContext(ConfigCtx)