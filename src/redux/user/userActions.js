import { SET_TYPE } from './userTypes'

export const setType = (number,id ) => {
  return {
    type: SET_TYPE,
    payload: number,
    userid:id
  }
}
