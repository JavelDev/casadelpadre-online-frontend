const DEFAULT_STATE = { qualities: [], quality: -1 }
export const videoQuality = (state = DEFAULT_STATE, { type, data }) => {
  if (type === "set-qualities") {
    return { ...state, qualities: data, quality: state.quality || -1 }
  }
  if (type === "set-quality") {
    return { ...state, quality: data }
  }

  return state
}
