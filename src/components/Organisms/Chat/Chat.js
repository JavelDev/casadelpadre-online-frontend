import { useState, useEffect, useRef } from "react"
import { MyStorage, userID } from "../../../helpers/helpers"
import { getDateDiffs, verifyDiff } from "../../../hooks/useTimeAgo"
import Socket from "../../../services/socket"
import Icon from "../../Molecules/Icon"
import IdentifyForm from "./IdentifyForm"
import Messages from "./Messages"
const ENTER_KEY = 13

const Chat = () => {
  // * Manejar Session
  const [session, setSession] = useState(
    JSON.parse(MyStorage.getItem("userData") || "{}")
  )
  const [identified, setIdentified] = useState(session.identified)
  const [editor, setEditor] = useState(session.name === undefined)
  const showEditor = (e) => {
    e.preventDefault()
    setEditor(true)
  }

  // Enviar identificacion
  const calcIdentify = () => {
    if (!identified) return true
    const { unit } = getDateDiffs(Date.now(), session.identified)
    if (["second", "minute"].includes(unit)) return false
    return true
  }
  const identify = () => {
    if (!calcIdentify()) return false
    Socket.send("chat-message", {
      message: `${session.name} esta viendo`,
      username: session.name,
      sendedAt: Date.now(),
      sendedBy: userID,
      identify: true,
    })
    MyStorage.setItem(
      "userData",
      JSON.stringify({ ...session, identified: Date.now() })
    )
    setIdentified(true)
  }
  // Setear nombre
  const onIdentified = (name) => {
    setSession({ ...session, name })
  }

  useEffect(() => {
    if (!session || !session.name) return false
    MyStorage.setItem("userData", JSON.stringify(session))
    setEditor(false)
    identify()
  }, [session])

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
    if (e.which === ENTER_KEY && !e.ctrlKey) sendMessage()
  }

  return !editor ? (
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
  ) : (
    <IdentifyForm onIdentified={onIdentified} defaultValue={session.name} />
  )
}
export default Chat
