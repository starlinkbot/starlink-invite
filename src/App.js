import { Suspense } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { 
  StartPage, 
  SignupPage,
  SuccessPage,
  NotfoundPage,
} from "@/page"
import "@/i18n"
import "./App.less"

const App = () => {
  
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Switch>
          <Route exact path="/invite/:code?" component={StartPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/success" component={SuccessPage} />
          <Route path="/*" component={NotfoundPage} />
        </Switch>
      </Suspense>
    </Router>
    
  )
}

export default App