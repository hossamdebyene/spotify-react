
export const tokening = (data) => {
  return {
    type: "TOKENING",
    payload: data,
  }
}

export const artist = (data) => {
  return {
    type: "ARTIST",
    payload: data,
  }
}