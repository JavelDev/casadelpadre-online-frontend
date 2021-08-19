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
  const playerRef = useRef()

  useEffect(() => {
    const player = playerRef.current
    if (player.canPlayType("application/vnd.apple.mpegurl")) {
      player.src = url
    }
    if (!HLS.isSupported()) return console.error("Unsupported")

    player.addEventListener("contextmenu", (e) => {
      e.preventDefault()
    })

    const hls = new HLS()
    hls.loadSource(url)
    hls.attachMedia(player)

    hls.on(HLS.Events.FRAG_LOADING, () => {
      if (player.paused) setLoading(true)
    })
    hls.on(HLS.Events.FRAG_LOADED, () => (loading ? setLoading(false) : false))

    hls.on(HLS.Events.MANIFEST_LOADED, () => {
      player.play()

      console.log(hls.levels, hls.currentLevel, hls.bandwidthEstimate)
      setTimeout(() => {
        console.log("Cambiando calidad")
        hls.currentLevel = 0
      }, 5000)
    })
  }, [])

  // Play / Pause
  const togglePlay = () => {
    if (playing) playerRef.current.pause()
    else playerRef.current.play()
    setPlaying(!playing)
  }
  return (
    <div className="player-container">
      <video src={url} playsInline ref={playerRef} muted={muted} />
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
