const useClass = () => {
  
  const classNames = (classes) => {
    return classes.filter(Boolean).join(" ")
  }

  return {
    classNames
  }
}

export default useClass