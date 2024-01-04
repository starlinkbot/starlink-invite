import { theString } from "@/util"

const mathematics = {

  getDecimalLength(num) {
    const str = num.toString()
    if (str.indexOf('.') !== -1) {
      return str.length - str.indexOf('.') - 1
    } else {
      return 0
    }
  },

  add(a, b) {
    const c = Math.max(this.getDecimalLength(a), this.getDecimalLength(b))
    const d = Math.pow(10, c)
    return (a * d + b * d) / d
  },

  floorLocaleString(amount) {
    if (theString.invalid(amount)) return "-"
    const amountString = `${amount}`
    const isLastStr = /[a-zA-Z]$/.test(amountString)
    const lastString = isLastStr ? amountString.slice(-1) : ""
    const _amountString = isLastStr ? amountString.slice(0, -1) : amountString
    const _amount = parseFloat(_amountString)
    const __amount = parseFloat(Math.floor(_amount * 1000) / 1000)
    const ___amount = __amount.toLocaleString()
    return isLastStr ? `${___amount} ${lastString}` : ___amount
  },

  ceilLocaleString(amount) {
    const _amount = parseFloat(amount)
    const __amount = parseFloat(Math.ceil(_amount * 1000) / 1000)
    return __amount.toLocaleString()
  },

  floorString(amount, digit = 2) {
    const _amount = parseFloat(amount)
    const _digit = Math.pow(10, digit)
    const __amount = parseFloat(Math.floor(_amount * _digit) / _digit)
    return __amount.toString()
  },

  ceilString(amount) {
    const _amount = parseFloat(amount)
    const __amount = parseFloat(Math.ceil(_amount * 1000) / 1000)
    return __amount.toString()
  },

  standard(amount, digit = 2) {
    if (theString.invalid(amount)) return "-"
    const amountString = `${amount}`
    const isLastStr = /[a-zA-Z]$/.test(amountString)
    const _amountString = isLastStr ? amountString.slice(0, -1) : amountString
    const _amount = Number(_amountString)
    if (_amount < 1024) {
      const __amount = parseFloat(this.floorString(_amount, digit))
      return `${__amount}M`
    } else if (_amount >= 1024 && _amount < 1024 * 1024) {
      const __amount = parseFloat(this.floorString(_amount / 1024.0, digit))
      return `${__amount}G`
    } else {
      const __amount = parseFloat(this.floorString(_amount / (1024.0 * 1024.0), digit))
      return `${__amount}T`
    }
  },

  localString(amount, digit = 2) {
    if (theString.invalid(amount)) return "-"
    const amountString = `${amount}`
    const isLastStr = /[a-zA-Z]$/.test(amountString)
    const lastString = isLastStr ? amountString.slice(-1) : ""
    const _amountString = isLastStr ? amountString.slice(0, -1) : amountString
    const _amount = parseFloat(this.floorString(_amountString, digit))
    return isLastStr ? `${_amount} ${lastString}` : _amount
  },

}

export default mathematics