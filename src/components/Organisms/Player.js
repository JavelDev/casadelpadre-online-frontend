import { useState } from "react"
import { useSelector } from "react-redux"
import ReactPlayer from "react-player/file"
import Icon from "../Molecules/Icon"
import Loader from "../Molecules/Loader"
const Player = () => {
  const url = useSelector(({ videoQuality }) => videoQuality.url)
  const [loading, setLoading] = useState(true)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)

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
        width="unset"
        height="unset"
        playsinline
      />
      <div className="player-controls">
        {loading && <Loader />}
        {!loading && (
          <div
            className={`playing-control ${playing ? "is-playing" : ""}`}
            onClick={togglePlay}
          ></div>
        )}
        {muted && !loading && (
          <button className="unmute" onClick={() => setMuted(false)}>
            <Icon>volume_off</Icon>{" "}
            <span>Click aquí para activar el sonido</span>
          </button>
        )}
      </div>
    </div>
  )
}
export default Player
