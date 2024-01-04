
const useGtag = () => {

  const gtag = (event) => {
    window.gtag("event", `g-${event}`)
  }

  return {
    gtag
  }
}

export default useGtag