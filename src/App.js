import "./styles/main.scss"
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import HomePage from "./components/Pages/HomePage"
import OfflinePage from "./components/Pages/OfflinePage"
import MessagesPage from "./components/Pages/MessagesPage"
import Socket from "./services/socket"

function App() {
  const [online, setOnline] = useState(undefined)
  const [url, setUrl] = useState("")
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/online`)
      .then((res) => res.json())
      .then((res) => {
        setUrl(res.stream_url)
        if (res.online) setOnline(true)
      })
      .catch((err) => console.error(err))
  }, [])
  Socket.on("stream-started", () => (!online ? setOnline(true) : false))
  Socket.on("stream-ended", () => (online ? setOnline(false) : false))
  return (
    <Router>
      <Route path="/chat" component={MessagesPage} />
      <Route path="/" exact>
        {online ? <HomePage url={url} /> : <OfflinePage />}
      </Route>
    </Router>
  )
}

export default App
