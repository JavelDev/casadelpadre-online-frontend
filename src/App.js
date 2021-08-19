import "./styles/main.scss"
import Chat from "./components/Organisms/Chat"
import LiveInfo from "./components/Organisms/LiveInfo"
import Player from "./components/Organisms/PlayerJS"
import { useEffect, useState } from "react"
import store from "./redux/store"
import { Provider } from "react-redux"
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
    <Provider store={store}>
      <div className="app-container">
        <Player url={url} />
        <LiveInfo />
        <Chat />
      </div>
    </Provider>
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
