import "./styles/main.scss"
import Chat from "./components/Organisms/Chat"
import LiveInfo from "./components/Organisms/LiveInfo"
import Player from "./components/Organisms/Player"
import { useEffect, useState } from "react"
import store from "./redux/store"
import { Provider } from "react-redux"
import { loadStreams } from "./redux/actionCreators"
import Loader from "./components/Molecules/Loader"
import Socket from "./services/socket"

function App() {
  const [online, setOnline] = useState(undefined)
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/online`)
      .then((res) => res.json())
      .then((res) => {
        store.dispatch(loadStreams(res.streams))
        if (res.online) setOnline(true)
      })
      .catch((err) => console.error(err))
  }, [])
  Socket.on("stream-started", () => setOnline(true))
  Socket.on("stream-ended", () => setOnline(false))

  return online ? (
    <Provider store={store}>
      <div className="app-container">
        <Player />
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
