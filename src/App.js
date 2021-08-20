import "./styles/main.scss"
import { BrowserRouter as Router, Route } from "react-router-dom"
import HomePage from "./components/Pages/HomePage"
import { useEffect, useState } from "react"
import Loader from "./components/Molecules/Loader"
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
  Socket.on("stream-started", () => setOnline(true))
  Socket.on("stream-ended", () => setOnline(false))

  return online ? (
    <Router>
      <Route path="/">
        <HomePage url={url} />
      </Route>
    </Router>
  ) : (
    <div className="offline-page">
      <div>
        <h1>No estamos en vivo</h1>
        <h2>
          ¿Hoy toca servicio? Espera aquí hasta que la transmisión comience
        </h2>
      </div>
      <div className="offline-page__loading">
        <Loader />
        <p>Esperando señal</p>
      </div>
    </div>
  )
}

export default App
