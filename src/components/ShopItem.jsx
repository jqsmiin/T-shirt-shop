import { Link } from "react-router-dom"
import { useState } from "react"

function ShopItem({listing,id, onDelete}) {

    const [value, setValue] = useState(1)
    const [price, setPrice] = useState(listing.price)

    const onChange = (e) =>{
      setValue(e.target.value)
    }

    const onAdd = () =>{
        const price = listing.price
        setValue(value + 1)
        const val = (value + 1) * price
        setPrice(val)
    }
    const onMinus = () =>{
        if(value > 1){
            const price = listing.price
            setValue(value - 1)
            const val = (value - 1) * price
            setPrice(val)
        }
    }
    return (
        <>
          <div className="col-md-3 shopItemOne">
          <Link className="categoryLink" to={`/shop/${id}`}>
          <img src={listing.imgUrls[0]} alt="T-shirt" />
          </Link>
          </div>
          <div className="col-md-3">
              <div className="text-content">
                  <h6 className="shopBrand">{listing.brand}</h6>
                  <h6 className="shopSize">{listing.size}</h6>
                  <h6 className="shopPrice">$ {price}</h6>
              </div>
          </div>
          <div className="col-md-3 shopItemThree">
              <span onClick={onAdd} className="plus"><i className="fa-solid fa-plus"></i></span>
                     
              <input
               disabled
               className="shopInput" 
               type='number' 
               onChange={onChange} 
               value={value}
               min='1'
               max='150'
               >
              </input>
                <span onClick={onMinus} className="minus"><i className="fa-solid fa-minus"></i></span>  

              {onDelete &&(
                     <h3 onClick={() => onDelete(listing.id)} className="deleteShopIcon"><i class="fa-solid fa-trash"></i></h3>
                 )}   
          </div>

          <div className="button">
            <Link className="signinButton" to={`/payment/${id}/${price}`}>
             Buy
            </Link>
          </div>
        </>
    )
}

export default ShopItem
