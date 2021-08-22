import { useState, useEffect, useRef } from "react"
import Socket from "../../../services/socket"
import Message from "../Message"
const Messages = () => {
  // * Manejar mensajes
  const container = useRef()
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
  useEffect(() => {
    if (!container.current) return false
    container.current.scrollTop = container.current.scrollHeight
  }, [messages])
  Socket.on("chat-message", (msg) => {
    setMessages([...messages, msg])
  })
  return (
    <div className="chat-messages-container" ref={container}>
      {messages.map((m, i) => (
        <Message key={i} {...m} />
      ))}
    </div>
  )
}
export default Messages
