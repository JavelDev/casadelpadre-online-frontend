import { useState } from "react"
import Socket from "../../services/socket"
const useViewers = () => {
  const [total, setTotal] = useState(0)
  Socket.on("viewers-refresh", ({ viewers }) => setTotal(viewers))
  return total
}

const LiveInfo = () => {
  const total = useViewers()
  return (
    <div className="live-info">
      <div className="live-banner">
        <span className="live-banner__text">Live</span>
        <span className="live-banner__counter">{total}</span>
      </div>
    </div>
  )
}
export default LiveInfo
