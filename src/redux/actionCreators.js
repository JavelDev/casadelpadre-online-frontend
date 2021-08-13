export const getAllData = () => async dispatch => {
  try {
    let req = await fetch(`http://localhost:8080/v1/streaming`),
      res = await req.json()
    if (!req.ok) throw Error("Falló la carga")
    dispatch({ type: "get_all@all", data: res })
  } catch (err) {
    console.error(err)
  }
}
export const newChatMessage = data => dispatch => {
  dispatch({ type: "message@chat", data })
}
export const sendChatMessage = message => dispatch => {
  dispatch({ type: "message@chat", data: { username: "Pepelias", message } })
}
