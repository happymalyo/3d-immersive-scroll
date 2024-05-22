const getZPosition = (zPosition) => {
    return {
      type: "SET-Z-POSITION",
      payload: {
        z: zPosition,
      }
    }
  }

export default getZPosition;