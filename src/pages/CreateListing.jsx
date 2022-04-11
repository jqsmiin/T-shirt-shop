import {useNavigate} from 'react-router-dom'
import {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {db} from '../firebase.config'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import {v4 as uuidv4} from 'uuid'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function CreateListing() {
   const [loading, setLoading] = useState(false)
   const [formData, setFormData] = useState({
       type : 'shirt',
       age : '',
       brand : '',
       gender : 'male',
       images : {},
       price : '',
       size : 'S'
   })

   const {type, age, brand, gender, images, price, size} = formData
   
   const auth = getAuth()
   const navigate = useNavigate()
   const isMounted = useRef(true)

   useEffect(() =>{
       if(isMounted){
          onAuthStateChanged(auth, (user) =>{
            if(user){
              setFormData({...formData, userRef : user.uid})
            }else{
              navigate('/sign-in')
            }
          })
       }

       return () =>{
           isMounted.current = false
       }

      
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isMounted])

   const onSubmit = async (e) =>{
       e.preventDefault()

       console.log(formData);

       setLoading(true)
       if(images.length > 6){
           setLoading(false)
           toast.error('Max 6 images')
           return
       }
       // Store images in firebase
       const storeImage = async (image) =>{
           return new Promise((resolve, reject) =>{
               const storage = getStorage()
               const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

               const storageRef = ref(storage, 'images/' + fileName)

               const uploadTask = uploadBytesResumable(storageRef, image)

               uploadTask.on('state_changed',
    (snapshot) => {
       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       console.log('Upload is ' + progress + '% done');
    }, 
    (error) => {
    reject(error)
    }, 
    () => {
     // Upload completed successfully, now we can get the download URL
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        resolve(downloadURL);
       })
    }
  )
    })
  }

   const imgUrls = await Promise.all(
       [...images].map((image) => storeImage(image))
   ).catch(() =>{
       setLoading(false)
       toast.error('Images not uploaded')
       return
   })

   const formDataCopy = {
     ...formData,
     imgUrls,
     timestamp : serverTimestamp()
   }

   delete formDataCopy.images

   const docRef = await addDoc(collection(db, 'listings'), formDataCopy)

  setLoading(false)

  toast.success('Listing saved')
  navigate(`/category/${formDataCopy.type}/${docRef.id}`)
  }
  const onMutate = (e) => {
    let boolean = null

    if (e.target.value === 'true') {
      boolean = true
    }
    if (e.target.value === 'false') {
      boolean = false
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }))
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }))
    }
  }

   if(loading){
       return <Spinner />
   }

    return (
       <div className="profile">
           <header>
               <p className='pageHeader'>Create a Listing</p>
           </header>
           <div className="container">
 <div className="row">
     <div className="col-md-7">
          <form className='listingForm' onSubmit={onSubmit}>
              <label className='formLabel'>T-shirt/Hoodie</label>
                 <div className="formButtons">
                <button 
                 type='button' 
                 className={type === 'shirt' ? 'red-btn' : 'gray-btn'}
                 id='type'
                 value='shirt'
                 onClick={onMutate}
                 >
                  T-shirt
                 </button>

                 <button 
                 type='button' 
                 className={type === 'hoodie' ? 'red-btn' : 'gray-btn'}
                 id='type'
                 value='hoodie'
                 onClick={onMutate}
                 >
                  Hoodie
                 </button>
             </div>
             <div className="form-group">
             <label className='formLabel'>Brand</label>
             <input 
             className='formInputName'
             type="text" 
             id='brand'
             value={brand}
             onChange={onMutate}
             maxLength='15'
             minLength='2'
             required
             />
             </div>
             <div className="form-group">
             <label className='formLabel'>Age</label>
             <input 
             className='formInputName'
             type="number" 
             id='age'
             value={age}
             onChange={onMutate}
             min='1'
             max='150'
             required
             />
             </div>
             <label className='formLabel'>Male/Female</label>
                 <div className="formButtons">
                <button 
                 type='button' 
                 className={gender === 'male' ? 'red-btn' : 'gray-btn'}
                 id='gender'
                 value='male'
                 onClick={onMutate}
                 >
                  Male
                 </button>

                 <button 
                 type='button' 
                 className={gender === 'female' ? 'red-btn' : 'gray-btn'}
                 id='gender'
                 value='female'
                 onClick={onMutate}
                 >
                  Female
                 </button>
              </div>
              <label className='formLabel pt-4'>Size</label>
              <div className="formButtons">
                <button 
                 type='button' 
                 className={size === 'S' ? 'red-btn' : 'gray-btn'}
                 id='size'
                 value='S'
                 onClick={onMutate}
                 >
                  S
                 </button>

                 <button 
                 type='button' 
                 className={size === 'M' ? 'red-btn' : 'gray-btn'}
                 id='size'
                 value='M'
                 onClick={onMutate}
                 >
                  M
                 </button>
                 <button 
                 type='button' 
                 className={size === 'L' ? 'red-btn' : 'gray-btn'}
                 id='size'
                 value='L'
                 onClick={onMutate}
                 >
                  L
                 </button>
                 <button 
                 type='button' 
                 className={size === 'XL' ? 'red-btn' : 'gray-btn'}
                 id='size'
                 value='XL'
                 onClick={onMutate}
                 >
                  XL
                 </button>
                 <button 
                 type='button' 
                 className={size === '2XL' ? 'red-btn' : 'gray-btn'}
                 id='size'
                 value='2XL'
                 onClick={onMutate}
                 >
                  2XL
                 </button>
                 <button 
                 type='button' 
                 className={size === '3XL' ? 'red-btn' : 'gray-btn'}
                 id='size'
                 value='3XL'
                 onClick={onMutate}
                 >
                  3XL
                 </button>
                 <button 
                 type='button' 
                 className={size === '4XL' ? 'red-btn' : 'gray-btn'}
                 id='size'
                 value='4XL'
                 onClick={onMutate}
                 >
                  4XL
                 </button>
                 <button 
                 type='button' 
                 className={size === '5XL' ? 'red-btn' : 'gray-btn'}
                 id='size'
                 value='5XL'
                 onClick={onMutate}
                 >
                  5XL
                 </button>
              </div>
              <div className="form-group">
             <label className='formLabel'>Price</label>
             <input 
             className='formInputName'
             type="number" 
             id='price'
             value={price}
             onChange={onMutate}
             min='1'
             max='150'
             required
             />
             </div>
             <div className="form-group">
             <label className='formLabel'>Images</label>
             <p className='messageInfo'>The first image will be the cover (max 6).</p>
             <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
             </div>

             <button type='submit' className='red-btn'>Create Listing</button>
            </form>
         </div>
      </div>
    </div>
  </div>
 )
}

export default CreateListing
