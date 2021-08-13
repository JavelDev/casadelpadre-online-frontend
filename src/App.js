import "./styles/main.scss"
import Chat from "./components/Organisms/Chat"
import LiveInfo from "./components/Organisms/LiveInfo"
import Player from "./components/Organisms/Player"
import store from "./redux/store"
import { Provider } from "react-redux"
import { getAllData } from "./redux/actionCreators"

// Cargar toda la info
store.dispatch(getAllData())

function App() {
  return (
    <Provider store={store}>
      <Player />
      <LiveInfo />
      <Chat />
    </Provider>
  )
}

export default App
