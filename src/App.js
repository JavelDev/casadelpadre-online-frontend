import "./styles/main.scss"
import Chat from "./components/Organisms/Chat"
import LiveInfo from "./components/Organisms/LiveInfo"
import Player from "./components/Organisms/Player"
import { useEffect, useState } from "react"
// import "./services/realtime"

function App() {
  const [online, setOnline] = useState(undefined)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/online`)
      .then(() => setOnline(true))
      .catch(err => console.error(err))
  }, [])

  return online ? (
    <>
      <Player />
      <LiveInfo />
      <Chat />
    </>
  ) : (
    <h1>No estamos online</h1>
  )
}

export default App
