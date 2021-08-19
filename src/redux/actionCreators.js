export const setQualities = (data) => (dispatch) => {
  dispatch({ type: "set-qualities", data })
}
export const setQuality = (quality) => (dispatch) => {
  dispatch({ type: "set-quality", data: quality })
}
