import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Oauth from "../components/Oauth";

function SignIn() {
    const [formData, setFormData] = useState({
        email : '',
        password : ''
    })

    const navigate = useNavigate()

    const {email, password} = formData

    const onChange = (e) =>{
     setFormData((prevState) =>({
        ...prevState,
        [e.target.id] : e.target.value
     }))
    }
    const onSubmit = async (e) =>{
        e.preventDefault()
        try {
            const auth = getAuth()
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            if(userCredential){
                navigate('/')
            }
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
          <label htmlFor="email">Enter Your Email</label>
          <input type="email" placeholder='Email' id='email' value={email} onChange={onChange} />
          <label htmlFor="password">Enter Your Password</label>
          <input type="password" id='password' value={password} onChange={onChange} placeholder='Password' />
          <div className="button">
          <input className="signinButton" type="submit" value='Submit'/>
          </div>
        </form>

        <Oauth />
   
        <div className="links">
        <Link style={{
         color: 'red'
        }} to='/forgot-password'>Forgot Password?</Link>
        <Link className="signLink" to='/sign-up'>Sign Up Instead</Link>
        </div>
        </div>
      </div>
    )
}

export default SignIn


