import Chat from "./components/Organisms/Chat"
import LiveInfo from "./components/Organisms/LiveInfo"
import Player from "./components/Organisms/Player"
import "./styles/main.scss"

function App() {
  return (
    <>
      <Player />
      <LiveInfo />
      <Chat />
    </>
  )
}

export default App
