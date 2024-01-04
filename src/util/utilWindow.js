const theWindow = {

  getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split("&")
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=")
      if (pair[0] === variable) {
        return decodeURIComponent(pair[1])
      }
    }
    return false
  },

  getComputedStyle(color) {
    return getComputedStyle(document.documentElement).getPropertyValue(color).trim()
  },

  setStatusBarColor(color) {
    if (!!window.setStatusBarColor) {
      window.setStatusBarColor.postMessage(color)
    }
  },

  setStatusBarIconBrightness(brightness) {
    if (!!window.setStatusBarIconBrightness) {
      window.setStatusBarIconBrightness.postMessage(brightness)
    }
  },

  gotoScanPage() {
    if (!!window.gotoScanPage) {
      window.gotoScanPage.postMessage("")
    }
  },

  flutterOpenUrl(url) {
    if (!!window.flutterOpenUrl) {
      window.flutterOpenUrl.postMessage(url)
    }
  },

  updateApp(info) {
    if (!!window.updateApp) {
      window.updateApp.postMessage(info)
    }
  }
}

export default theWindow