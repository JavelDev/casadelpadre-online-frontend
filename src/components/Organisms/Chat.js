import Icon from "../Molecules/Icon"
import Message from "./Message"
import { useDispatch, useSelector } from "react-redux"
import { sendChatMessage } from "../../redux/actionCreators"

const Chat = () => {
  const messages = useSelector(({ liveStream }) => liveStream.chat),
    dispatch = useDispatch()

  const onSubmit = e => {
    e.preventDefault()
    console.log(e.target.message.value)
    dispatch(sendChatMessage(e.target.message.value))
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
