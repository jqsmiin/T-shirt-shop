import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import Country from "../components/Country"
import Spinner from "../components/Spinner"

function Payment() {

    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState({
         first : '',
         last : '',
         email : '',
         phone : '',
         city : '',
         zip : '',
         address1 : '',
         address2 : ''
    })

    const {first, last, email, phone, city, zip, address1, address2} = value;

    const params = useParams()

    useEffect(() =>{
        const fetchListing = async () =>{
          const docRef = doc(db, 'cart', params.listingId)
          const docSnap = await getDoc(docRef)
  
          if(docSnap.exists()){
              console.log(docSnap.data())
              setListing(docSnap.data())
              setLoading(false)
          }
        }
  
        fetchListing()
     }, [params.listingId])

     if(loading){
        return  <Spinner />
     }

     const onChange = (e) =>{
        setValue((prevState) =>({
            ...prevState,
            [e.target.id] : e.target.value
         }))
     }

    return (
        <section id="payment">
     <div className="container">
         <div className="pageHeaderTwo">
            <p>Selected Product</p>
            <div className="row">
                <div className="col-md-12 payment-item">
                <div className="first-content">
          <h2 className="text-center pb-4">1. Selected Product</h2>
              <div className="imgItem">
                 <img src={listing.imgUrls[0]} alt="listingItem" />
          <div className="content-items-info">
             <h6 className="paymentBrand">{listing.brand}</h6>
             <h6 className="shopSize">{listing.size}</h6>
             <h6 className="shopPrice">$ {params.listingPrice}</h6>
         </div>
            </div>
               </div>
                </div>

                <div className="col-md-12 payment-item">
                <div className="delivery">
                <h2 className="text-center pb-2">2. Delivery</h2>
                <Country />
                </div>
                </div>


                <div className="col-md-12 payment-item payment-item-3">
                <div className="first-content">
                <h2 className="text-center pb-2">3. Payment</h2>
                 <form className='d-flex flex-column w-100 pb-2 sign-form-two'>
          
                     <input type="text" id="first" placeholder='First Name' value={first} onChange={onChange} />
                    <input type="text" id="last" value={last} onChange={onChange} placeholder='Last Name' />
                    <input type="email" id="email" value={email} onChange={onChange} placeholder='Email' />
                    <input type="text" id="phone" value={phone} onChange={onChange} placeholder='Phone Number' />
                    <input type="text" id="address1" value={address1} onChange={onChange} placeholder='Address Line 1' />
                    <input type="text" id="address2" value={address2} onChange={onChange} placeholder='Address Line 2' />
                    <input type="text" id="zip" value={zip} onChange={onChange} placeholder='Zip Code' />
                    <input type="text" id="city" value={city} onChange={onChange} placeholder='City' />
                    <div className="button ms-3">
                     <input className="signinButton" type="submit" value='Submit'/>
                   </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
     </div>

 </section>
    )
}

export default Payment
