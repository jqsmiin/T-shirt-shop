import { useEffect, useState } from "react";
import {collection, getDocs, query, where, limit, doc, deleteDoc} from 'firebase/firestore'
import { db } from "../firebase.config"
import {toast} from 'react-toastify'
import { getAuth } from "firebase/auth"
import ShopItem from "../components/ShopItem";
import Spinner from '../components/Spinner'

function Shop() {

    const [shopData, setShopData] = useState(null)
    const [loading, setLoading] = useState(true)

    const auth = getAuth()

   useEffect(() =>{
    const fetchListings = async () =>{
        try {
             // Get reference
             const listingsRef = collection(db, 'cart')
             
             // Create a query
             const q = query(
              listingsRef, 
              where('createdBy', '==' , auth.currentUser.uid),
              limit(10)
             )
             // Execute query
             const querySnap = await getDocs(q)

             const listings = []

             querySnap.forEach((doc) =>{
                 return listings.push({
                     id : doc.id,
                     data : doc.data()
                 })
             })

             setShopData(listings)
             setLoading(false)
        } catch (error) {
            toast.error('Could not fetch listings')
            console.log(error);
        }
    }
    
    fetchListings()
  }, [auth.currentUser.uid])

  const onDelete = async (listingId) =>{
    if(window.confirm('Are you sure')){
        await deleteDoc(doc(db, 'cart', listingId))

        const updatedListings = shopData.filter((listing) => listing.id !== listingId)

        setShopData(updatedListings)

        toast.success('Listing deleted successfully')
    }
  }

  if(loading){
    return  <Spinner />
 }


    return (
        <div className='category'> 
        <header>
            <p className="pageHeader">
                Cart
            </p>
            {loading ? <Spinner />
            : shopData && shopData.length > 0
            ? (
                <>
                  <ul className='categoryListings'>
                      <div className="container">
                          <div className="row shop-items justify-content-cetner">
                          {shopData.map((listing) =>(
                         <ShopItem
                         listing={listing.data} 
                         key={listing.id} 
                         id={listing.id}
                         onDelete={() => onDelete(listing.id)}
                         />
                        ))}
                          </div>
                      </div>
                  </ul>

                  <br />
                  <br />

                </>
            )
            : <p>Your cart is empty</p>}
        </header>
    </div>
    )
}

export default Shop
