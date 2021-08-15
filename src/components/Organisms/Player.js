import { useState } from "react"
import ReactPlayer from "react-player/file"
import Icon from "../Molecules/Icon"
import Loader from "../Molecules/Loader"
const Player = () => {
  const [loading, setLoading] = useState(true),
    [muted, setMuted] = useState(true),
    [url, setUrl] = useState("http://192.168.1.135:8080/video/video.m3u8"),
    [playing, setPlaying] = useState(true)
  const onBuffer = () => {
    setLoading(true)
  }
  const onBufferEnd = () => {
    setLoading(false)
  }
  const togglePlay = () => {
    setPlaying(!playing)
  }
  const onEnded = () => {
    console.log("El video terminó")
    setUrl("http://192.168.1.135:8080/video/completo.mp4")
  }
  return (
    <div className="player-container">
      <ReactPlayer
        url={url}
        muted={muted}
        autoPlay={true}
        playing={playing}
        onBuffer={onBuffer}
        onBufferEnd={onBufferEnd}
        onEnded={onEnded}
        width="100%"
        playsinline
      />
      <div className="player-controls">
        {loading && <Loader />}
        {!loading && <div className={`playing-control ${playing ? "is-playing" : ""}`} onClick={togglePlay}></div>}
        {muted && !loading && (
          <button className="unmute" onClick={() => setMuted(false)}>
            <Icon>volume_off</Icon> <span>Click aquí para activar el sonido</span>
          </button>
        )}
      </div>
    </div>
  )
}
export default Player
