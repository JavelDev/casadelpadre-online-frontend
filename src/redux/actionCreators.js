export const loadStreams = (streams) => (dispatch) => {
  dispatch({ type: "set-streams", data: streams })
}
export const setQuality = (quality) => (dispatch) => {
  dispatch({ type: "set-quality", data: quality })
}
