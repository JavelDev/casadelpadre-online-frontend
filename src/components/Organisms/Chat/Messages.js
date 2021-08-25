import { useEffect, useRef } from "react"
import useMessages from "../../../hooks/useMessages"
import Message from "../Message"
const Messages = () => {
  // * Manejar mensajes
  const container = useRef()
  const { messages } = useMessages()
  useEffect(() => {
    if (!container.current) return false
    container.current.scrollTop = container.current.scrollHeight
  }, [messages])
  return (
    <div className="chat-messages-container" ref={container}>
      {messages.map((m, i) => (
        <Message key={i} {...m} />
      ))}
    </div>
  )
}
export default Messages
