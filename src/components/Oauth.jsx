import { useLocation, useNavigate } from "react-router-dom"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"
import {toast} from 'react-toastify'
import Google from '../images/search.png'

function Oauth() {
   const navigate = useNavigate()
   const location = useLocation()

   const onGoogleClick = async () =>{
       try {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const user = result.user
        
        // Checking for user
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        if(!docSnap.exists()){
            await setDoc(doc(db, 'users', user.uid), {
              name : user.displayName,
              email : user.email,
              createdAt : serverTimestamp()
            })
        }
        toast.success('Successful login with google')
        navigate('/')
       } catch (error) {
           toast.error('Could not authorize with google')
       }   
       
   }

    return (
        <div className="oauthContent">
           <p className="Oauthtitle">Sign {location.pathname === '/sign-in' ? 'in' : 'up'} with</p>
            <span className="google" onClick={onGoogleClick}>
            <img src={Google} alt="T-shirt"/>
            </span>
        </div>
    )
}

export default Oauth
