import Icon from "../Molecules/Icon"

const Chat = () => {
  return (
    <div className="chat-container">
      <div className="chat-messages-container">
        <time className="chat-hour">Hoy 20:15</time>
        <div className="chat-message">
          <span className="chat-message__username">Irene Gómez</span>
          <span className="chat-message__content">Hola hermanos bendiciones</span>
        </div>
        <div className="chat-message own">
          <span className="chat-message__username">Irene Gómez</span>
          <span className="chat-message__content">Hola hermanos bendiciones</span>
        </div>
        <div className="chat-message">
          <span className="chat-message__username">Irene Gómez</span>
          <span className="chat-message__content">Hola hermanos bendiciones</span>
        </div>
        <time className="chat-hour">Hoy 20:20</time>
        <div className="chat-message">
          <span className="chat-message__username">Irene Gómez</span>
          <span className="chat-message__content">Hola hermanos bendiciones</span>
        </div>
        <time className="chat-assistand">Valeria está viendo</time>
        <div className="chat-message">
          <span className="chat-message__username">Irene Gómez</span>
          <span className="chat-message__content">Hola hermanos bendiciones</span>
        </div>
        <div className="chat-message">
          <span className="chat-message__username">Irene Gómez</span>
          <span className="chat-message__content">Hola hermanos bendiciones</span>
        </div>
        <div className="chat-message">
          <span className="chat-message__username">Irene Gómez</span>
          <span className="chat-message__content">Hola hermanos bendiciones</span>
        </div>
        <time className="chat-hour">Hoy 20:45</time>
        <div className="chat-message">
          <span className="chat-message__username">Irene Gómez</span>
          <span className="chat-message__content">Hola hermanos bendiciones</span>
        </div>
      </div>
      <form className="chat-writer">
        <textarea className="chat-writer-input"></textarea>
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
