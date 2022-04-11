import { useState, useEffect} from "react"
import { getAuth } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom"
import { collection, getDocs, query, where, orderBy, doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import ListingItem from "../components/ListingItem"

function Profile() {
    const navigate = useNavigate()
    const auth = getAuth()
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)

    const onLogout = () =>{
        auth.signOut()
        navigate('/')
    }

    useEffect(() =>{
       const fetchCollection = async () =>{
         try {
             const listingRef = collection(db, 'listings')

             const q = query(
                 listingRef, 
                 where('userRef', '==', auth.currentUser.uid),
                 orderBy('timestamp', 'desc')
            )

            const querySnap = await getDocs(q)

            const listings = []

            querySnap.forEach((doc) =>{
                return listings.push({
                    id : doc.id,
                    data : doc.data()
                })
            })

            setListings(listings)
            setLoading(false)
         } catch (error) {
             console.log(error);
         }
       }

       fetchCollection()
    }, [auth.currentUser.uid])

    const onDelete = async (listingId) =>{
        if(window.confirm('Are you sure')){
            await deleteDoc(doc(db, 'listings', listingId))

            const updatedListings = listings.filter((listing) => listing.id !== listingId)

            setListings(updatedListings)

            toast.success('Listing deleted successfully')
        }
    }

    return <div className="profile">
        <div className="container">
        <div className="row">
            <div className="col-md-6">
               <h1>My Profile</h1>
               <div className="userDetails">
                <div className="name">
                    <h2>Name : </h2>
                    <h4>{auth.currentUser.displayName}</h4>
                </div>
                <div className="email">
                    <h2>Email : </h2>
                    <h4>{auth.currentUser.email}</h4>
                </div>
            </div>
            </div>
            <div className="col-md-6 profile-item-2">
                <button className="signinButton" onClick={onLogout}>Logout</button>
            </div>
            <div className="d-flex justify-content-center">
            <Link to='/create-listing'>
            <p className="createListing">
                 <span><i className="fa-solid fa-arrow-left"></i></span> 
                 
                 Sell your T-shirt or Hoodie
                 
                 <span><i className="fa-solid fa-arrow-right"></i></span>
                 </p>
            </Link>
            </div>
            <p className="pageSubtitle">
                    Your Listings
            </p>
            {!loading && listings?.length > 0 && (
                 <>
                 <ul className='categoryListings'>
                     <div className="container">
                         <div className="row category-items">
                         {listings.map((listing) =>(
                        <ListingItem 
                        listing={listing.data} 
                        id={listing.id} 
                        key={listing.id} 
                        onDelete={() => onDelete(listing.id)}
                        />
                       ))}
                         </div>
                     </div>
                 </ul>
               </>
            )}
        </div>
        </div>
    </div>
}

export default Profile