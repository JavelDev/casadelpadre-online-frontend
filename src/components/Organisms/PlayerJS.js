import { useEffect, useRef } from "react"
import videojs from "video.js"
import "videojs-contrib-hls"
import "videojs-contrib-quality-levels"
import "videojs-hls-quality-selector"
import "video.js/dist/video-js.css"
import Icon from "../Molecules/Icon"

const Player = ({ url }) => {
  const videoRef = useRef()
  const buttonRef = useRef()
  let player

  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement) {
      player = videojs(
        videoElement,
        {
          autoplay: true,
          muted: true,
          fluid: true,
          controls: true,
          responsive: true,
          sources: [
            { src: url, type: "application/vnd.apple.mpegurl" },
            { src: url, type: "application/x-mpegURL" },
          ],
        },
        () => videoElement.play()
      )
      player.hlsQualitySelector({ displayCurrentQuality: true })
      return () => player.dispose()
    }
  }, [])

  const unmute = () => {
    if (!player) return false
    player.muted(false)
    player.play()
    buttonRef.current.remove()
  }

  return (
    <div className="player-container">
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
        playsInline
      />
      <div className="unmute" onClick={unmute} ref={buttonRef}>
        <Icon>volume_up</Icon>
        <span>Click aquí para activar sonido</span>
      </div>
    </div>
  )
}
export default Player
