import { createStore } from 'redux'

import userReducer from './user/userReducer'

function saveto(state)
{
const a=JSON.stringify(state)
localStorage.setItem('state',a)
}

function loadfrom()
{
const a=localStorage.getItem('state')
if(a===null) return undefined
return JSON.parse(a)
}

const persist=loadfrom()

const store = createStore(userReducer,persist)

store.subscribe(()=>saveto(store.getState()))

export default store
