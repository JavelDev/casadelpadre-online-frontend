import Icon from "../Molecules/Icon"
import Message from "./Message"
import { useEffect, useRef, useState } from "react"
import Socket from "../../services/socket"
import { userID } from "../../helpers/helpers"
import { verifyDiff } from "../../hooks/useTimeAgo"

const ENTER_KEY = 13

const Chat = () => {
  const [messages, setMessages] = useState([]),
    [username, setUsername] = useState(localStorage.getItem("username")),
    [editor, setEditor] = useState(!username),
    [error, setError] = useState(""),
    writer = useRef(),
    container = useRef()

  // Cargar los mensajes (en caché)
  useEffect(() => {
    fetch(process.env.REACT_APP_API)
      .then(res => res.json())
      .then(({ chat }) => setMessages(chat))
      .catch(err => console.error(err))
  }, [])

  // Scrolear al final
  useEffect(() => {
    if (!container.current) return false
    container.current.scrollTop = container.current.scrollHeight
  }, [messages, container])

  // Recibir un mensaje
  Socket.on("chat-message", message => setMessages([...messages, message]))

  // *  Enviar el mensaje
  const send = () => {
    console.log("Username", username)
    if (!username) return setEditor(true)
    Socket.send("chat-message", {
      username,
      message: writer.current.message.value,
      sended_at: Date.now(),
      userID,
      show_timestamp: verifyDiff(Date.now()),
    })
    writer.current.reset()
  }

  // Enviar el formulario
  const onSubmit = e => {
    e.preventDefault()
    send()
  }

  // Manejar tecla ENTER
  const handleKeyup = e => {
    if (e.which === ENTER_KEY && e.ctrlKey) send()
  }

  // * Configurar username
  const handleSettings = e => {
    e.preventDefault()
    setEditor(true)
  }
  const handleIdentify = e => {
    e.preventDefault()
    let usrname = e.target.username.value
    if (usrname.length <= 4) return setError("El nombre debe tener al menos 4 letras")
    if (["anonimo", "anónimo", "anonimous"].includes(usrname.toLowerCase())) return setError("Ingrese su nombre real")
    setUsername(usrname)
    setEditor(false)
    localStorage.setItem("username", usrname)
  }

  return editor ? (
    <form className="identify-editor" onSubmit={handleIdentify}>
      <h1 className="subtitle">Indicanos tu nombre para usar el Chat</h1>
      <p className="message failed">{error}</p>
      <input type="text" id="username" placeholder="Escriba su nombre aquí" className="main" defaultValue={username} autoFocus />
      <button>
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
      <form className="chat-writer" onSubmit={onSubmit} ref={writer}>
        <textarea className="chat-writer-input" id="message" onKeyUp={handleKeyup}></textarea>
        <button className="only-icon secondary" onClick={handleSettings}>
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
