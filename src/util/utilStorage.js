
const storage = {
  
  setl(key, value) {
    const jsonValue = JSON.stringify(value)
    localStorage.setItem(key, jsonValue)
  },
  getl(key) {
    const jsonValue = localStorage.getItem(key)
    try {
      const value = JSON.parse(jsonValue)
      return value
    } catch (error) {
      return jsonValue
    }
  },
  removel(key) {
    localStorage.removeItem(key)
  },
  clearl() {
    localStorage.clear()
  },
  
  sets(key, value) {
    const jsonValue = JSON.stringify(value)
    sessionStorage.setItem(key, jsonValue)
  },
  gets(key) {
    const jsonValue = sessionStorage.getItem(key)
    try {
      const value = JSON.parse(jsonValue)
      return value
    } catch (error) {
      return jsonValue
    }
  },
  removes(key) {
    sessionStorage.removeItem(key)
  },
  clears() {
    sessionStorage.clear()
  },
}

export default storage