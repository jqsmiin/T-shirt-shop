import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { db } from "../firebase.config";
import { getDoc, doc } from "firebase/firestore";
import {toast} from 'react-toastify';

function Contact() {
    const [message, setMessage] = useState('')
    const [landlord, setLandlord] = useState(null)
     // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams()

    const params = useParams()

    useEffect(() =>{
       const getLandLord = async () =>{
         const docRef = doc(db, 'users', params.landlordId)
         const docSnap = await getDoc(docRef)

         if(docSnap.exists()){
             console.log(docSnap.data());
             setLandlord(docSnap.data())
         }else{
             toast.error('Could not get landlord data')
         }
       }

       getLandLord()
    }, [params.landlordId])

    const onChange = (e) => setMessage(e.target.value)

    return (
        <div>
            <p className="pageHeader">Contact</p>
              <div className="container">
                 <h4>Contact {landlord?.name}</h4>
                 <div className="contactDiv d-flex flex-column">
                  <label htmlFor="message">Message</label>
                  <textarea value={message} onChange={onChange} name="message" id="message" cols="30" rows="10">

                  </textarea>
                 </div>
                  <a href={`mailto:${landlord?.email}?Subject=${searchParams.get('listingBrand')}&body=${message}`}>
                      <button type="button" className="red-btn">Send Message</button>
                  </a>
              </div>
        </div>
    )
}

export default Contact
