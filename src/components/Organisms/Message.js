const Message = ({ username, message, sended_at, time_point }) => {
  return (
    <>
      {time_point && <time className="chat-hour">{sended_at}</time>}
      <div className="chat-message">
        <span className="chat-message__username">{username}</span>
        <span className="chat-message__content">{message}</span>
      </div>
    </>
  )
}
export default Message
