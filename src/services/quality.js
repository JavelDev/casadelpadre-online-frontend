import store from "../redux/store"
import { setQuality } from "../redux/actionCreators"

export function getQuality() {
  if (!("connection" in navigator)) return "480p"
  if (navigator.connection.downlink < 5) return "480p"
  if (navigator.connection.downlink < 2.5) return "240p"
  return "720p"
}

// Autocalcular
const autoCalc = () => {
  console.log("Calculando Velocidad")
  if (!("connection" in navigator)) return false
  navigator.connection.addEventListener("change", () => {
    const quality = getQuality()
    store.dispatch(setQuality(quality))
  })
}
autoCalc()
