import Chat from "../Organisms/Chat"
import LiveInfo from "../Organisms/LiveInfo"
import Player from "../Organisms/PlayerJS"
const HomePage = ({ url }) => {
  return (
    <div className="app-container">
      <Player url={url} />
      <LiveInfo />
      <Chat />
    </div>
  )
}
export default HomePage
