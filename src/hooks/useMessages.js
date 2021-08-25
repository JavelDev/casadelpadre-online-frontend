import { useEffect, useState } from "react"
import Socket from "../services/socket"

const useMessages = () => {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    fetch(process.env.REACT_APP_API)
      .then((r) => r.json())
      .then(({ chat }) => setMessages(chat.filter((msg) => !msg.identify)))
      .catch((err) => {
        console.error(err)
        alert(err)
      })
  }, [])

  Socket.on("chat-message", (msg) => {
    setMessages([...messages, msg])
  })

  return { messages }
}

export default useMessages
