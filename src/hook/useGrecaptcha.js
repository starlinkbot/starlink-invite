
const useGrecaptcha = () => {

  const initGrecaptcha = (callback) => {
    window.grecaptcha.ready(async function() {
      const token = await window.grecaptcha.execute(
        "6LdldPwZAAAAACfK_nyA9IJ42FBtiNojpqURLQl4", {
          action: "submit"
        }
      )
      callback({
        captchaType: "RECAPTCHA",
        googleResponse: token
      })
    })
  }

  return {
    initGrecaptcha
  }
}

export default useGrecaptcha