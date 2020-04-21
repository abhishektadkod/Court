import { SET_TYPE } from './userTypes'

export const setType = (number ) => {
  return {
    type: SET_TYPE,
    payload: number
  }
}
