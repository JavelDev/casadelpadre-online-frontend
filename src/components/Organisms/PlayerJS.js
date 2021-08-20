import { useEffect, useRef } from "react"
import videojs from "video.js"
import "videojs-contrib-hls"
import "videojs-contrib-quality-levels"
import "videojs-http-source-selector-mute"
import "video.js/dist/video-js.css"

const Player = ({ url }) => {
  const videoRef = useRef()

  useEffect(() => {
    const videoElement = videoRef.current
    let player
    if (videoElement) {
      player = videojs(
        videoElement,
        {
          autoplay: true,
          muted: true,
          fluid: true,
          controls: true,
          responsive: true,
          sources: [{ src: url, type: "application/x-mpegURL" }],
          plugins: {
            httpSourceSelectorMute: { default: "auto" },
          },
        },
        () => {
          videoElement.play()
        }
      )
      player.qualityLevels()
      return () => player.dispose()
    }
  }, [])

  return (
    <div className="player-container">
      <video ref={videoRef} className="video-js vjs-bib-play-centered" />
    </div>
  )
}
export default Player
