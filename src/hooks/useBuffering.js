import { useState } from "react"

export const useBuffering = () => {
  const [loading, setLoading] = useState()
  const [player, setPlayer] = useState()
  const checkInterval = 900 // check every 50 ms (do not use lower values)
  const margin = 300 // Margen de tolerancia
  let lastPlayPos = 0
  let currentPlayPos = 0
  let bufferingDetected = false

  setInterval(checkBuffering, checkInterval)

  function checkBuffering() {
    if (!player) return false
    currentPlayPos = player.currentTime

    // checking offset should be at most the check interval
    // but allow for some margin
    const offset = (checkInterval - margin) / 1000

    // if no buffering is currently detected,
    // and the position does not seem to increase
    // and the player isn't manually paused...
    if (
      !bufferingDetected &&
      currentPlayPos < lastPlayPos + offset &&
      !player.paused
    ) {
      bufferingDetected = true
      setLoading(true)
    }

    // if we were buffering but the player has advanced,
    // then there is no buffering
    if (
      bufferingDetected &&
      currentPlayPos > lastPlayPos + offset &&
      !player.paused
    ) {
      bufferingDetected = false
      setLoading(false)
    }
    lastPlayPos = currentPlayPos
  }
  return { loading, setPlayer }
}
