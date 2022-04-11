import {useState} from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import {toast} from 'react-toastify'

function ForgotPassword() {
   const [email, setEmail] = useState('')

   const onChange = (e) => setEmail(e.target.value)

   const onSubmit = async (e) =>{
     e.preventDefault()
     try {
         const auth = getAuth()
    
         await sendPasswordResetEmail(auth, email)
         
         toast.success('Email was sent')
     } catch (error) {
         toast.error('Could not sent email')
     }
   }

    return (
        <div className='container'>
             <div className="pageHeaderTwo">
            <p>Forgot Password</p>
             </div>
            <form className='d-flex flex-column w-50 pb-2 sign-form' onSubmit={onSubmit}>
                <label htmlFor="email">Enter your E-mail</label>
                <input 
                type="email" 
                placeholder='Enter Email' 
                value={email} 
                id='email' 
                onChange={onChange}
                />
               <div className="button">
               <input className="signinButton" type="submit" value='Submit'/>
               </div>
            </form>
        </div>
    )
}

export default ForgotPassword
