import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setQuality } from "../../redux/actionCreators"
import Socket from "../../services/socket"
const useViewers = () => {
  const [total, setTotal] = useState(0)
  Socket.on("viewers-refresh", ({ viewers }) => setTotal(viewers))
  return total
}

const LiveInfo = () => {
  const total = useViewers()
  const quality = useSelector(({ videoQuality }) => videoQuality.quality)
  const dispatch = useDispatch()
  const selectQuality = (quality) => {
    dispatch(setQuality(quality))
  }
  return (
    <div className="live-info">
      <div className="live-banner">
        <span className="live-banner__text">Live</span>
        <span className="live-banner__counter">{total}</span>
      </div>
      <div className="quality-selector">
        <button
          className={quality === "240p" ? "active" : ""}
          onClick={() => selectQuality("240p")}
        >
          240p
        </button>
        <button
          className={quality === "480p" ? "active" : ""}
          onClick={() => selectQuality("480p")}
        >
          480p
        </button>
        <button
          className={quality === "720p" ? "active" : ""}
          onClick={() => selectQuality("720p")}
        >
          720p
        </button>
      </div>
    </div>
  )
}
export default LiveInfo
