import { SET_TYPE } from './userTypes'

const initialState = {
  typeOfUser: "none"
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TYPE: return {
      ...state,
      typeOfUser: action.payload
    }
    

    default: return state
  }
}

export default userReducer
