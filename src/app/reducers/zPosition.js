const zPositionReducer = (state = {z: 0}, action) => {
    const {type, payload} = action;
    switch(type){
        case "SET-Z-POSITION":
            return {
                z: payload.z
            }
        default:
            return state;
    }
}

export default zPositionReducer;