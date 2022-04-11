import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from 'react-toastify'
import {db} from '../firebase.config'
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import Oauth from "../components/Oauth";

function SignUp() {

    const [formData, setFormData] = useState({
        name : '',
        email : '',
        password : ''
    })
    const navigate = useNavigate()
    const {name, email, password} = formData
    const onChange = (e) =>{ 
      setFormData((prevState) =>({
          ...prevState,
          [e.target.id] : e.target.value
      }))
    }
    
    const onSubmit = async (e) =>{
        e.preventDefault()
        try{
            // Get Auth
            const auth = getAuth()
            // Set User Credentials
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            // Set User
            const user = userCredential.user
            // Update profile and set name
            updateProfile(auth.currentUser, {
              displayName: name,
            })
            // Copy formData
            const formDataCopy = {...formData}
            // Set timeStamp
            formDataCopy.timestamp = serverTimestamp()
            // Save data to firebase storage
            await setDoc(doc(db, 'users', user.uid), formDataCopy)
            // Navigate to home page
            navigate('/') 

        } catch (error) {
            toast.error('Something goes wrong')
        }
    }
   

    return (
        <div className="signIn">
      <div className="container pt-5">
      <div className="pageHeaderTwo">
            <p>Welcome Back!</p>
        </div>
      <form onSubmit={onSubmit} className='d-flex flex-column w-50 pb-2 sign-form'>
      <label htmlFor="password">Enter Your Name</label>
        <input type="text" id='name' value={name} onChange={onChange} placeholder='Name' />
        <label htmlFor="email">Enter Your Email</label>
        <input type="email" placeholder='Email' id='email' value={email} onChange={onChange} />
        <label htmlFor="password">Enter Your Password</label>
        <input type="password" id='password' value={password} onChange={onChange} placeholder='Password' />
        <div className="button">
        <input type="submit" value='Submit' className="signinButton" />
        </div>
      </form>

      <Oauth />
      
      <div className="links justify-content-center">
      <Link className="signLink" to='/sign-in'>Sign In Instead</Link>
      </div>
      </div>
    </div>
    )
}

export default SignUp