const reducer = (state, action) => {
  switch(action.key) {
    case "tEmail":
      return { ...state, tEmail: action.value }
    case "tNewEmail":
      return { ...state, tNewEmail: action.value }
    default:
      return state
  }
}

export default reducer