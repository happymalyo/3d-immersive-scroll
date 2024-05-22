const getIncrementAction = (numberToIncrement) => {
    return {
      type: "INCREMENT",
      payload: {
        incrementBy: numberToIncrement,
      }
    }
  }

export default getIncrementAction;