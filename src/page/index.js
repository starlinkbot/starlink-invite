import React from "react"

const StartPage = React.lazy(() => import("./start"))
const SignupPage = React.lazy(() => import("./signup"))
const SuccessPage = React.lazy(() => import("./success"))
const NotfoundPage = React.lazy(() => import("./404"))

export {
  StartPage, 
  SignupPage,
  SuccessPage,
  NotfoundPage 
}