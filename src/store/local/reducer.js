import { storage } from "@/util"

const reducer = (state, action) => {
  storage.setl(action.key, action.value)
  switch(action.key) {
    case "lCode":
      return { ...state, lCode: action.value }
    default:
      return state
  }
}

export default reducer