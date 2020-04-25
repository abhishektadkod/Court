import { SET_TYPE } from './userTypes'

const initialState = {
  typeOfUser: "none",
  id:""
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TYPE: return {
      ...state,
      typeOfUser: action.payload,
      id:action.userid
    }
    

    default: return state
  }
}

export default userReducer
