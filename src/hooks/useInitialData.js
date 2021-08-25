import { useState, useEffect } from "react"
import Socket from "../services/socket"

const useInitialData = () => {
  const [isOnline, setIsOnline] = useState()
  const [url, setUrl] = useState("")

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/online`)
      .then((res) => res.json())
      .then((res) => {
        setUrl(res.stream_url)
        if (res.online) setIsOnline(true)
      })
      .catch((err) => console.error(err))
  }, [])

  Socket.on("stream-started", () => (!isOnline ? setIsOnline(true) : false))
  Socket.on("stream-ended", () => (isOnline ? setIsOnline(false) : false))

  return { isOnline, url }
}
export default useInitialData
