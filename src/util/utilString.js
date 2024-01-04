
const theString = {

  ellipsisMiddle(str, maxLength) {
    if (str.length <= maxLength) {
      return str
    }
    const leftPart = str.slice(0, maxLength / 2)
    const rightPart = str.slice(-maxLength / 2)
    return leftPart + '...' + rightPart
  },

  invalid(str) {
    if (str === undefined || str === null) {
      return true
    }
    return false
  },

  standard(str) {
    return !this.invalid(str) ? str : "-"
  }

}

export default theString