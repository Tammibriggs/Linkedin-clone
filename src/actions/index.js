import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
import {auth, provider, storage} from '../firebase'
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from './actionType'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import db from '../firebase'
import {collection, addDoc, query, orderBy, onSnapshot} from 'firebase/firestore'

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

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status
})

export function signOutAPI(){
  return (dispatch) => {
    signOut(auth)
    .then(dispatch(setUser(null)))
    .catch((error) => {
      console.log(error.message)
    })
  }
}

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload
})

export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true))

    if (payload.image != ''){
      const imageRef = ref(storage, `images/${payload.image.name}`)
      const uploadTask = uploadBytesResumable(imageRef, payload.image)
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        console.log(`progress: ${progress}%`)
        if(snapshot.state === 'running') {
          console.log(`Progress: ${progress}%`)
        }
      },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          await addDoc(collection(db, 'articles'), {
            arthor : {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL
            },
            video: payload.video,
            sharedImg: downloadURL,
            commend: 0,
            description: payload.description
          })
          dispatch(setLoading(false))
        }
      ) 
    } else if (payload.video) {
      addDoc(collection(db, 'articles'), {
        arthor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL
        },
        video: payload.video,
        shareImg: '',
        commends: 0,
        description: payload.description
      })
      dispatch(setLoading(false))
    }
  }
}

export function getArticlesAPI() {
  return (dispatch) => {
    let payload;
    const queryRef = query(collection(db, 'articles'), orderBy('arthor.date', 'desc'))
    onSnapshot(queryRef, (querySnapshot) => {
      payload = querySnapshot.docs.map(doc => doc.data())
      dispatch(getArticles(payload))
    })
  }
}