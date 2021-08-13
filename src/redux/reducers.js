export const liveStream = (state = { chat: [] }, { type, data }) => {
  switch (type) {
    case "get_all@all":
      console.log("Recibimos", data)
      return data
    case "message@chat":
      return {
        ...state,
        chat: [...state.chat, data],
      }
    default:
      return state
  }
}
