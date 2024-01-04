import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import Provider from "@/store"
import 'normalize.css'
import "./index.less"

ReactDOM.render(
  <Provider>
    <App />
 </Provider>,
  document.getElementById("root")
)

reportWebVitals()