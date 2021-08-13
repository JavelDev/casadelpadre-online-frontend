import Icon from "../Molecules/Icon"
import Message from "./Message"
import { useEffect, useState } from "react"
import Socket from "../../services/socket"

const Chat = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetch(process.env.REACT_APP_API)
      .then(res => res.json())
      .then(({ chat }) => setMessages(chat))
      .catch(err => console.error(err))
  }, [])

  Socket.on("chat-message", message => setMessages([...messages, message]))

  const onSubmit = e => {
    e.preventDefault()
    Socket.send("chat-message", {
      username: "Pepeto",
      message: e.target.message.value,
    })
    e.target.reset()
  }

  return (
    <div className="chat-container">
      <div className="chat-messages-container">
        {messages.map((m, i) => (
          <Message key={i} {...m} />
        ))}
      </div>
      <form className="chat-writer" onSubmit={onSubmit}>
        <textarea className="chat-writer-input" id="message"></textarea>
        <button className="only-icon secondary">
          <Icon>settings</Icon>
        </button>
        <button className="only-icon send">
          <Icon>send</Icon>
        </button>
      </form>
    </div>
  )
}
export default Chat
