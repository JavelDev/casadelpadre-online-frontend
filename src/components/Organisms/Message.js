import { userID } from "../../helpers/helpers"
import { getTimeAgo } from "../../hooks/useTimeAgo"
const Message = ({
  username,
  message,
  sendedAt,
  userID: id,
  showTimestamp,
  identify,
}) => {
  if (identify)
    return id === userID ? null : (
      <div className="chat-assistand">{message}</div>
    )
  return (
    <>
      {showTimestamp && (
        <time className="chat-hour">{getTimeAgo(sendedAt)}</time>
      )}
      <div className={`chat-message ${id === userID ? "own" : ""}`}>
        <span className="chat-message__username">{username}</span>
        <span className="chat-message__content">{message}</span>
      </div>
    </>
  )
}
export default Message
