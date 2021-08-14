import { userID } from "../../helpers/helpers"
import { getTimeAgo } from "../../hooks/useTimeAgo"
const Message = ({ username, message, sended_at, userID: id, show_timestamp, identify }) => {
  if (identify) return id === userID ? null : <div className="chat-assistand">{message}</div>
  return (
    <>
      {show_timestamp && <time className="chat-hour">{getTimeAgo(sended_at)}</time>}
      <div className={`chat-message ${id === userID ? "own" : ""}`}>
        <span className="chat-message__username">{username}</span>
        <span className="chat-message__content">{message}</span>
      </div>
    </>
  )
}
export default Message
