import { useState, useRef } from "react"
import { userID } from "../../../helpers/helpers"
import { verifyDiff } from "../../../helpers/timeAgo"
import useSessionData from "../../../hooks/useSessionData"
import Socket from "../../../services/socket"
import Icon from "../../Molecules/Icon"
import IdentifyForm from "./IdentifyForm"
import Messages from "./Messages"
const ENTER_KEY = 13

const Chat = () => {
  const { session, setUsername } = useSessionData()
  const [editor, setEditor] = useState(true)

  // Mostrar editor de nombre
  const showEditor = (e) => {
    e.preventDefault()
    setEditor(true)
  }

  // Setear nombre
  const onIdentified = (name) => {
    setEditor(false)
    setUsername(name)
  }

  // * Referencias
  const form = useRef()

  // * Enviar mensaje
  const sendMessage = () => {
    const msg = form.current.message.value.trim()
    if (msg === "") return false
    Socket.send("chat-message", {
      message: msg,
      username: session.name,
      sendedAt: Date.now(),
      showTimestamp: verifyDiff(Date.now()),
      sendedBy: userID,
    })
    form.current.reset()
  }
  const handleSendMessage = (e) => {
    e.preventDefault()
    sendMessage()
  }
  const handleKeyup = (e) => {
    if (e.which !== ENTER_KEY || e.ctrlKey) return false
    e.preventDefault()
    sendMessage()
  }

  if (editor) {
    return (
      <IdentifyForm onIdentified={onIdentified} defaultValue={session.name} />
    )
  }

  return (
    <div className="chat-container">
      <Messages />
      <form className="chat-writer" onSubmit={handleSendMessage} ref={form}>
        <textarea
          className="chat-writer-input"
          id="message"
          onKeyUp={handleKeyup}
        ></textarea>
        <button className="button only-icon basic" onClick={showEditor}>
          <Icon>settings</Icon>
        </button>
        <button className="button only-icon send">
          <Icon>send</Icon>
        </button>
      </form>
    </div>
  )
}
export default Chat
