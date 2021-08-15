import "./styles/main.scss"
import Chat from "./components/Organisms/Chat"
import LiveInfo from "./components/Organisms/LiveInfo"
import Player from "./components/Organisms/Player"
import { useEffect, useState } from "react"
import store from "./redux/store"
import { Provider } from "react-redux"
import { loadStreams } from "./redux/actionCreators"

function App() {
  const [online, setOnline] = useState(undefined)
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/online`)
      .then((res) => res.json())
      .then((res) => {
        store.dispatch(loadStreams(res.streams))
        setOnline(true)
      })
      .catch((err) => console.error(err))
  }, [])

  return online ? (
    <Provider store={store}>
      <Player />
      <LiveInfo />
      <Chat />
    </Provider>
  ) : (
    <h1>No estamos online</h1>
  )
}

export default App
