import { userID } from "../../helpers/helpers"
import { getTimeAgo } from "../../hooks/useTimeAgo"

const Message = ({
  username,
  message,
  sendedAt,
  sendedBy,
  showTimestamp,
  identify,
}) => {
  if (identify && sendedBy !== userID)
    return <p className="chat-assistand">{message}</p>
  return (
    !identify && (
      <>
        {showTimestamp && (
          <time className="chat-hour">{getTimeAgo(sendedAt)}</time>
        )}
        <div className={`chat-message ${sendedBy === userID ? "own" : ""}`}>
          <span className="chat-message__username">{username}</span>
          <span className="chat-message__content">{message}</span>
        </div>
      </>
    )
  )
}
export default Message
