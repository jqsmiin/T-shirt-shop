import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'

function Category() {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [fetchedListings, setFetchedListings] = useState(null)

    const params = useParams()

    useEffect(() =>{
      const fetchListings = async () =>{
          try {
               // Get reference
               const listingsRef = collection(db, 'listings')
               
               // Create a query
               const q = query(
                listingsRef, 
                where('type', '==', params.categoryName),
                orderBy('timestamp', 'desc'),
                limit(10)
               )
               // Execute query
               const querySnap = await getDocs(q)

               const lastVisible = querySnap.docs[querySnap.docs.length - 1]

               setFetchedListings(lastVisible)

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
              toast.error('Could not fetch listings')
          }
      }
      
      fetchListings()
    }, [params.categoryName])

    const fetchMoreListings = async () =>{
        try {
             // Get reference
             const listingsRef = collection(db, 'listings')
             
             // Create a query
             const q = query(
              listingsRef, 
              where('type', '==', params.categoryName),
              orderBy('timestamp', 'desc'),
              startAfter(fetchedListings),
              limit(10)
             )
             // Execute query
             const querySnap = await getDocs(q)

             const lastVisible = querySnap.docs[querySnap.docs.length - 1]

             setFetchedListings(lastVisible)

             const listings = []

             querySnap.forEach((doc) =>{
                 return listings.push({
                     id : doc.id,
                     data : doc.data()
                 })
             })

             setListings((prevState) => [...prevState, ...listings])
             setLoading(false)
        } catch (error) {
            toast.error('Could not fetch listings')
        }
    }

    return ( 
        <div className='category'> 
            <header>
                <p className="pageHeader">
                    {params.categoryName === 'shirt' ? 'T-Shirts' : 'Hoodies'}
                </p>
                {loading ? <Spinner />
                : listings && listings.length > 0 
                ? (
                    <>
                      <ul className='categoryListings'>
                          <div className="container">
                              <div className="row category-items">
                              {listings.map((listing) =>(
                             <ListingItem 
                             listing={listing.data} 
                             id={listing.id} 
                             key={listing.id} 
                             />
                            ))}
                              </div>
                          </div>
                      </ul>

                      <br />
                      <br />

                      {fetchedListings && listings.length > 9 && (
                          <div className="lastListing d-flex justify-content-center">
                              <p className='last' onClick={fetchMoreListings}>Load more</p>
                          </div>
                      )}
                    </>
                )
                : <p>No listings for {params.categoryName}</p>}
            </header>
        </div>
    )
}

export default Category
