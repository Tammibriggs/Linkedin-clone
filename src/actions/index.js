import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
import {auth, provider} from '../firebase'
import { SET_USER } from './actionType'

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload
})

export function signInApi() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
    .then((payload) => {
      dispatch(setUser(payload.user))
    }).catch(error => alert(error.message))
  }
}

export function getUserAuth(){
  return (dispatch) => {
    onAuthStateChanged(auth, async (user) => {
      if (user){
        dispatch(setUser(user))
      }
    })
  }
}

export function signOutAPI(){
  return (dispatch) => {
    signOut(auth)
    .then(dispatch(setUser(null)))
    .catch((error) => {
      console.log(error.message)
    })
  }
}