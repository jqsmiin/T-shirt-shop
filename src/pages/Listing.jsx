import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getAuth } from "firebase/auth"
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"
import {toast} from 'react-toastify'
import Spinner from "../components/Spinner"

function Listing() {
   const [listing, setListing] = useState(null)
   const [loading, setLoading] = useState(true)
    
   const params = useParams()
   const auth = getAuth()

   useEffect(() =>{
      const fetchListing = async () =>{
        const docRef = doc(db, 'listings', params.listingId)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){
            console.log(docSnap.data())
            setListing(docSnap.data())
            setLoading(false)
        }
      }

      fetchListing()
   }, [params.listingId])

   const createCart = async () =>{
     try {
      const formDataCopy = {
        brand: listing.brand,
        age: listing.age,
        gender: listing.gender,
        price : listing.price,
        size : listing.size,
        type : listing.type,
        imgUrls : listing.imgUrls,
        addedAt : serverTimestamp(),
        createdBy : auth.currentUser.uid
      }

      await addDoc(collection(db, 'cart'), formDataCopy)
      toast.success('Item added to cart')
     } catch (error) {
      console.log(error); 
      toast.error('Can t add item to cart')
     }

   }

   if(loading){
      return  <Spinner />
   }

    return (
        <div>
            <p className="pageHeader">Listing</p>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
  {listing.imgUrls[0] ? <div className="carousel-item active">
    <img src={listing?.imgUrls[0]} alt="" />
    </div> : null}
    {listing.imgUrls[1] ? <div className="carousel-item">
    <img src={listing?.imgUrls[1]} alt="" />
    </div> : null}
    {listing.imgUrls[2] ? <div className="carousel-item">
    <img src={listing?.imgUrls[2]} alt="" />
    </div> : null}
    {listing.imgUrls[3] ? <div className="carousel-item">
    <img src={listing?.imgUrls[3]} alt="" />
    </div> : null}
    {listing.imgUrls[4] ? <div className="carousel-item">
    <img src={listing?.imgUrls[4]} alt="" />
    </div> : null}
    {listing.imgUrls[5] ? <div className="carousel-item">
    <img src={listing?.imgUrls[5]} alt="" />
    </div> : null}
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
                </div>
                <div className="col-md-6 listing-item-2">
                  <h2>{listing.brand}</h2>
                <ul className="listingList">
                    <li>Age : {listing.age}</li>
                    <li>Gender : {listing.gender}</li>
                    <li>Price : $ {listing.price} </li>
                    <li>Size : {listing.size}</li>
                </ul>

                {auth.currentUser?.uid !== listing.userRef &&(
                   <div className="buttons">
                     <button className="signinButton" onClick={createCart}>
                      Add to Cart
                    </button>
                    <Link className="contactButton buttonHover" to={`/contact/${listing.userRef}?listingBrand=${listing.brand}`}> 
                      Contact Owner
                    </Link>
                   </div>
                    
                )}
                </div>
              </div>
            </div>
        </div>
    )
}

export default Listing
