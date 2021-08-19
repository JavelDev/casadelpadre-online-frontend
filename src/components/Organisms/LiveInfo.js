import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setQuality } from "../../redux/actionCreators"
// import { setQuality } from "../../redux/actionCreators"
import Socket from "../../services/socket"
const useViewers = () => {
  const [total, setTotal] = useState(0)
  Socket.on("viewers-refresh", ({ viewers }) => setTotal(viewers))
  return total
}

const LiveInfo = () => {
  const total = useViewers()
  const { qualities, quality } = useSelector(({ videoQuality }) => videoQuality)
  const dispatch = useDispatch()
  const select = (quality) => {
    dispatch(setQuality(quality))
  }
  return (
    <div className="live-info">
      <div className="live-banner">
        <span className="live-banner__text">Live</span>
        <span className="live-banner__counter">{total}</span>
      </div>
      <div className="quality-selector">
        {qualities.map((q, i) => {
          return (
            <button
              key={i}
              className={i === quality ? "active" : ""}
              onClick={() => select(i)}
            >
              {q.height}p
            </button>
          )
        })}
      </div>
    </div>
  )
}
export default LiveInfo
