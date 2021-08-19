import { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import HLS from "hls.js"
import Icon from "../Molecules/Icon"
import Loader from "../Molecules/Loader"
import { setQualities } from "../../redux/actionCreators"
import { useBuffering } from "../../hooks/useBuffering"

const Player = ({ url }) => {
  const { loading, setPlayer } = useBuffering()
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)
  const playerRef = useRef()
  const dispatch = useDispatch()
  const { quality } = useSelector(({ videoQuality }) => videoQuality)
  const hls = useMemo(
    () =>
      new HLS({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
        abrEwmaFastLive: 4,
        abrEwmaSlowLive: 8,
        abrEwmaDefaultEstimate: 3000,
        abrBandWidthFactor: 0.5,
      }),
    []
  )

  useEffect(() => {
    const player = playerRef.current
    if (player.canPlayType("application/vnd.apple.mpegurl")) {
      player.src = url
    }
    if (!HLS.isSupported()) return console.error("Unsupported")

    setPlayer(player)
    hls.loadSource(url)
    hls.attachMedia(player)

    player.addEventListener("contextmenu", (e) => {
      e.preventDefault()
    })

    hls.on(HLS.Events.MANIFEST_LOADED, () => {
      player.play()
      dispatch(setQualities(hls.levels))
    })
  }, [])

  useEffect(() => {
    if (!hls || hls.currentLevel === quality) return false
    hls.currentLevel = quality
  }, [quality])

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
