import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import HLS from "hls.js"
import Icon from "../Molecules/Icon"
import Loader from "../Molecules/Loader"

const Player = () => {
  const { url } = useSelector(({ videoQuality }) => videoQuality)
  const [loading, setLoading] = useState(false)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)
  const player = useRef()

  useEffect(() => {
    console.log(player.current.canPlayType("application/vnd.apple.mpegurl"))
    if (player.current.canPlayType("application/vnd.apple.mpegurl")) {
      player.current.src = url
    }
    if (!HLS.isSupported()) return console.error("Unsupported")
    const hls = new HLS()
    hls.loadSource(url)
    hls.attachMedia(player.current)
    hls.on(HLS.Events.FRAG_LOADING, () => setLoading(true))
    hls.on(HLS.Events.FRAG_LOADED, () => setLoading(false))
    player.current.addEventListener("waiting", (e) => {
      console.log("Empezo a hace buffer", e)
    })
    player.current.addEventListener("bufferend", () => {
      console.log("Termino el buffer")
    })
  }, [])

  // Play / Pause
  const togglePlay = () => {
    setPlaying(!playing)
  }
  return (
    <div className="player-container">
      <video src={url} playsInline ref={player} muted={muted} autoPlay />
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
