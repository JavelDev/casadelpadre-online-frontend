import "./styles/main.scss"
import { BrowserRouter as Router, Route } from "react-router-dom"
import HomePage from "./components/Pages/HomePage"
import OfflinePage from "./components/Pages/OfflinePage"
import MessagesPage from "./components/Pages/MessagesPage"
import useInitialData from "./hooks/useInitialData"

function App() {
  const { url, isOnline } = useInitialData()
  return (
    <Router>
      <Route path="/chat" component={MessagesPage} />
      <Route path="/" exact>
        {isOnline ? <HomePage url={url} /> : <OfflinePage />}
      </Route>
    </Router>
  )
}

export default App
