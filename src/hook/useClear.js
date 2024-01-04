import { storage } from "@/util"

const useClear = () => {

  const cleanUserInfo = () => {
    storage.clearl()
    storage.clears()
  }

  return {
    cleanUserInfo
  }
}

export default useClear