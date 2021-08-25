import { useState } from "react"
import Socket from "../services/socket"
const useTotalViewers = () => {
  const [total, setTotal] = useState(0)
  Socket.on("viewers-refresh", ({ viewers }) => setTotal(viewers))
  return total
}
export default useTotalViewers
