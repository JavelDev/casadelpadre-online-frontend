import useTotalViewers from "../../hooks/useTotalViewers"

const LiveInfo = () => {
  const total = useTotalViewers()
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
