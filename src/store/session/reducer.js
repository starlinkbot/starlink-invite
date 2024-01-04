import { storage } from "@/util"

const reducer = (state, action) => {
  storage.sets(action.key, action.value)
  switch(action.key) {
    case "sCloseBanner":
      return { ...state, sCloseBanner: action.value }
    default:
      return state
  }
}

export default reducer