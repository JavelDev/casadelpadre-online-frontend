import { newChatMessage, setViewers } from "../redux/actionCreators"
import Socket from "./socket"
import store from "../redux/store"

Socket.on("chat-message", message => {
  store.dispatch(newChatMessage(message))
})
Socket.on("viewers-refresh", message => {
  console.log("Viewers", message)
  store.dispatch(setViewers(message))
})
