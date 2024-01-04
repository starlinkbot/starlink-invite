import { useHistory } from "react-router-dom"

const useRoute = () => {
  const history = useHistory()

  const push = (pathname) => {
    history.push(`${pathname}`) 
  }

  const replace = (pathname) => {
    history.replace(`${pathname}`)
  }

  const back = (number) => {
    if (!!number) {
      history.go(number)
    } else {
      history.goBack()
    }
  }


  return {
    push, replace, back
  }
}

export default useRoute