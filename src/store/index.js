import React from "react"
import { Provider as LocalProvider } from "./local"
import { Provider as SessionProvider } from "./session"
import { Provider as TemporaryProvider } from "./temporary"
export { useLocalStore } from "./local"
export { useSessionStore } from "./session"
export { useTemporaryStore } from "./temporary"

const providers = [LocalProvider, SessionProvider, TemporaryProvider]
const Provider = (props) => 
  providers.reduceRight((children, Parent) => <Parent>{ children }</Parent>, props.children)
export default Provider