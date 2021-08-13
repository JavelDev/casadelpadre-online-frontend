const LiveInfo = () => {
  return (
    <div className="live-info">
      <div className="live-banner">
        <span className="live-banner__text">Live</span>
        <span className="live-banner__counter">15</span>
      </div>
      <div className="quality-selector">
        <button>144p</button>
        <button className="active">480p</button>
        <button>720p</button>
      </div>
    </div>
  )
}
export default LiveInfo
