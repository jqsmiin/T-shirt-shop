import { Link } from "react-router-dom"

function ListingItem({listing, id, onDelete}) {
    return ( 
        <>
        <div className="col-md-3 categoryContainer">
                    <Link className="categoryLink" to={`/category/${listing.type}/${id}`}>
                    <img src={listing.imgUrls[0]} alt="T-shirt" />
                    <div className="text-content">
                    <h6><span className="red">{listing.brand[0].toUpperCase() + listing.brand.substring(1)}</span></h6>
                    <h6>$ {listing.price}</h6>
                    </div>
                    </Link>

                 {onDelete &&(
                     <h3 onClick={() => onDelete(listing.id)} className="deleteIcon"><i class="fa-solid fa-trash"></i></h3>
                 )}   
          </div>
        </>
    )
}

export default ListingItem
