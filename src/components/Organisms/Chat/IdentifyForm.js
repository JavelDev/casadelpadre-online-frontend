import { useState } from "react"
import Icon from "../../Molecules/Icon"

const IdentifyForm = ({ onIdentified, defaultValue }) => {
  const [error, setError] = useState()
  const onSubmit = (e) => {
    e.preventDefault()
    const username = e.target.username.value.trim()
    if (username.length < 4)
      return setError("El nombre necesita al menos 4 letras")
    onIdentified(username)
  }
  return (
    <form className="identify-editor" onSubmit={onSubmit}>
      <h1 className="subtitle">Indicanos tu nombre para usar el Chat</h1>
      <p className="message failed">{error}</p>
      <input
        type="text"
        id="username"
        placeholder="Escriba su nombre aquí"
        className="main"
        autoFocus
        defaultValue={defaultValue}
      />
      <button className="button">
        <Icon>person</Icon>
        <span>Entrar</span>
      </button>
    </form>
  )
}
export default IdentifyForm
