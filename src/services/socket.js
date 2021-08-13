const Socket = new (class {
  constructor() {
    this._events = {}
    this.connection = new WebSocket(process.env.REACT_APP_WEBSOCKET)
    this.connection.onopen = () => {
      console.log("Conectados correctamente al Websocket")
    }
    this.connection.onmessage = msg => {
      let data = JSON.parse(msg.data)
      this.dispatch(data.action, data.data)
    }
  }
  send(action, message) {
    this.connection.send(JSON.stringify({ action, data: message }))
  }
  dispatch(action, payload) {
    if (!this._events[action]) return false
    this._events[action].forEach(callback => callback(payload))
  }
  on(action, callback) {
    if (!this._events[action]) this._events[action] = []
    this._events[action].push(callback)
  }
})()
export default Socket
