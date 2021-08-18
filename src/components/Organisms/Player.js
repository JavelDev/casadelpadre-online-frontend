import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import ReactPlayer from "react-player/file"
import Icon from "../Molecules/Icon"
import Loader from "../Molecules/Loader"
const Player = () => {
  const { url } = useSelector(({ videoQuality }) => videoQuality)
  const ref = useRef()
  const [loading, setLoading] = useState(true)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)

  // Cargando
  const onBuffer = () => {
    setLoading(true)
  }
  // Terminó de cargar
  const onBufferEnd = () => {
    setLoading(false)
  }

  // Play / Pause
  const togglePlay = () => {
    setPlaying(!playing)
  }
  // Finalizó
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
        ref={ref}
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
