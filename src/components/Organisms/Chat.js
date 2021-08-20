import Icon from "../Molecules/Icon"
import Message from "./Message"
import { useEffect, useRef, useState } from "react"
import Socket from "../../services/socket"
import { userID } from "../../helpers/helpers"
import { getDateDiffs, verifyDiff } from "../../hooks/useTimeAgo"

const ENTER_KEY = 13

const Chat = ({ chatOnly }) => {
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState(localStorage.getItem("username"))
  const [editor, setEditor] = useState(!username && !chatOnly)
  const [error, setError] = useState("")
  const writer = useRef()
  const container = useRef()

  // Cargar los mensajes (en caché)
  useEffect(() => {
    fetch(process.env.REACT_APP_API)
      .then((res) => res.json())
      .then(({ chat }) => setMessages(chat.filter((m) => !m.identify)))
      .catch((err) => console.error(err))
  }, [])

  // Scrolear al final
  useEffect(() => {
    if (!container.current) return false
    container.current.scrollTop = container.current.scrollHeight
  }, [messages, container])

  // Recibir un mensaje
  Socket.on("chat-message", (message) => setMessages([...messages, message]))

  // *  Enviar el mensaje
  const send = () => {
    if (!username) return setEditor(true)
    if (writer.current.message.value.trim() === "") return false
    Socket.send("chat-message", {
      username,
      message: writer.current.message.value,
      sendedAt: Date.now(),
      userID,
      showTimestamp: verifyDiff(Date.now()),
    })
    writer.current.reset()
  }

  // Enviar el formulario
  const onSubmit = (e) => {
    e.preventDefault()
    send()
  }

  // Manejar tecla ENTER
  const handleKeyup = (e) => {
    if (e.which === ENTER_KEY && e.ctrlKey) send()
  }

  // * Identificarse

  // Enviar notificación
  const sendIdentify = () => {
    if (!localStorage.getItem("identified")) return true
    const { unit } = getDateDiffs(
      Date.now(),
      localStorage.getItem("identified")
    )
    if (["second", "minute"].includes(unit)) return false
    return true
  }
  const identify = () => {
    if (!username || !sendIdentify()) return false
    Socket.send("chat-message", {
      username,
      message: `${username} está viendo.`,
      sendedAt: Date.now(),
      userID,
      identify: true,
    })
    localStorage.setItem("identified", Date.now())
  }
  identify()

  // obtener username
  const handleSettings = (e) => {
    e.preventDefault()
    setEditor(true)
  }
  const handleIdentify = (e) => {
    e.preventDefault()
    const usrname = e.target.username.value
    if (usrname.length <= 4)
      return setError("El nombre debe tener al menos 4 letras")
    if (["anonimo", "anónimo", "anonimous"].includes(usrname.toLowerCase()))
      return setError("Ingrese su nombre real")
    setUsername(usrname)
    setEditor(false)
    localStorage.setItem("username", usrname)
    identify()
  }

  return editor ? (
    <form className="identify-editor" onSubmit={handleIdentify}>
      <h1 className="subtitle">Indicanos tu nombre para usar el Chat</h1>
      <p className="message failed">{error}</p>
      <input
        type="text"
        id="username"
        placeholder="Escriba su nombre aquí"
        className="main"
        defaultValue={username}
        autoFocus
      />
      <button className="button">
        <Icon>person</Icon>
        <span>Identificarme</span>
      </button>
    </form>
  ) : (
    <div className="chat-container">
      <div className="chat-messages-container" ref={container}>
        {messages.map((m, i) => (
          <Message key={i} {...m} />
        ))}
      </div>
      {!chatOnly && (
        <form className="chat-writer" onSubmit={onSubmit} ref={writer}>
          <textarea
            className="chat-writer-input"
            id="message"
            onKeyUp={handleKeyup}
          ></textarea>
          <button className="button only-icon basic" onClick={handleSettings}>
            <Icon>settings</Icon>
          </button>
          <button className="button only-icon send">
            <Icon>send</Icon>
          </button>
        </form>
      )}
    </div>
  )
}
export default Chat
