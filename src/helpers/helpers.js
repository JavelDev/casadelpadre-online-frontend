export const MyStorage = new (class {
  getItem(name) {
    if (!("localStorage" in window)) return false
    try {
      return localStorage.getItem(name)
    } catch (err) {
      return false
    }
  }

  setItem(name, content) {
    if (!("localStorage" in window)) return false
    try {
      return localStorage.setItem(name, content)
    } catch (err) {
      return false
    }
  }
})()

const makeID = (length) => {
  let result = ""
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  MyStorage.setItem("user_id", result)
  return result
}
export const userID = MyStorage.getItem("user_id") || makeID(11)
