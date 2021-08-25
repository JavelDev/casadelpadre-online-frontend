import { useEffect, useState } from "react"
import { MyStorage, userID } from "../helpers/helpers"
import { getDateDiffs } from "../helpers/timeAgo"
import Socket from "../services/socket"

const useSessionData = () => {
  // Recuperar la sesión del usuario
  const [session, setSession] = useState(
    JSON.parse(MyStorage.getItem("userData") || "{}")
  )
  const [identified, setIdentified] = useState(session.identified !== undefined)

  // * Enviar identificación
  // Calcular si corresponde identificarme
  const calcIdentify = () => {
    if (!identified) return true
    const { unit } = getDateDiffs(Date.now(), session.identified)
    console.log(unit)
    if (["second", "minute"].includes(unit)) return false
    return true
  }
  // Ejecutar el send
  const identify = () => {
    if (!calcIdentify()) return false
    Socket.send("chat-message", {
      message: `${session.name} esta viendo`,
      username: session.name,
      sendedAt: Date.now(),
      sendedBy: userID,
      identify: true,
    })
    // Actualizar el localStorage
    MyStorage.setItem(
      "userData",
      JSON.stringify({ ...session, identified: Date.now() })
    )
    setIdentified(true)
  }

  // * Detectar cambios (Persistir)
  useEffect(() => {
    if (!session || !session.name) return false
    MyStorage.setItem("userData", JSON.stringify(session))
    identify()
  }, [session])

  // * Configurar username
  const setUsername = (name) => {
    setSession({ ...session, name })
  }

  return { session, setUsername }
}

export default useSessionData
