import { Link } from "react-router-dom"
import Tshirt from '../images/t-shirt.jpg'
import Hoodie from '../images/hoodie.jpg'
import Clothing from '../images/clothing.jpg'


function Home() {
    return (
        <div>
           <div className="container pt-5">
               {/* Section One */}
               <div className="row clothing-container">
                   <div className="col-md-6 d-flex flex-column justify-content-center clothing-item-one">
                       <h2>Clothing</h2>
                       <p>Original clothing for original people. Choose clothes or sell them, all in one place.</p>
                   </div>
                   <div className="col-md-6">
                       <img src={Clothing} alt="clothing" />
                   </div>
               </div>
               {/* Section Two */}
               <div className="row">
                   <p className="pageHeader">Categories</p>
                   <div className="col-md-6 pt-4 home-item">
                       <Link to='/category/shirt'>
                         <img src={Tshirt} alt="T-shirt"/>
                       </Link>
                       <h3 className="text-center pt-4">T-shirt</h3>
                   </div>
                   <div className="col-md-6 pt-4 home-item">
                       <Link to='/category/hoodie'>
                         <img src={Hoodie} alt="Hoodie" />
                       </Link>
                       <h3 className="text-center pt-4">Hoodie</h3>
                   </div>
               </div>
               {/* Section Three */}
           </div>
           <section id="content">
           <div className="container">
           <div className="row">
                   <div className="col-md-3">
                       <span><i className="fa-solid fa-earth-africa"></i></span>
                      <h3>Worldwide Shipping</h3>
                      <p>Available as Standard or Express delivery</p>
                   </div>
                   <div className="col-md-3">
                   <span><i className="fa-solid fa-lock"></i></span>
                      <h3>Secure Payments</h3>
                      <p>100% Secure payment with 256-bit SSL Encryption</p>
                   </div>
                   <div className="col-md-3">
                   <span><i className="fa-solid fa-person-walking-arrow-loop-left"></i></span>
                      <h3>Free Return</h3>
                      <p>Exchange or money back guarantee for all orders</p>
                   </div>
                   <div className="col-md-3">
                   <span><i className="fa-solid fa-circle-info"></i></span>
                      <h3>Local Support</h3>
                      <p>24/7 Dedicated support</p>
                   </div>
               </div>
           </div>
           </section>
           <footer className='footer'> 
            <div className="container">
            <div className="row footer-content">
                  <div className="col-md-4">
                      <h2>Shop</h2>
                      <ul>
                          <li><Link to='/category/shirt'>T-shirt</Link></li>
                          <li><Link to='/category/hoodie'>Hoodie</Link></li>
                          <li><Link to='/profile'>Profile</Link></li>
                          <li><Link to='/login'>Login</Link></li>
                          <li><Link to='/sign-up'>Sign Up</Link></li>
                          <li><Link to='/about'>About Us</Link></li>
                      </ul>
                  </div>
                  <div className="col-md-4">
                      <h2>Social</h2>
                      <ul>
                          <li> <span><i className="fa-brands fa-instagram"></i></span> Instagram</li>
                          <li> <span><i className="fa-brands fa-facebook"></i></span> Facebook</li>
                          <li> <span><i className="fa-brands fa-twitter"></i></span> Twitter</li>
                          <li> <span><i className="fa-brands fa-pinterest"></i></span> Pinterest</li>
                          <li> <span><i className="fa-brands fa-tumblr"></i></span> Tumblr</li>
                      </ul>
                  </div>
                  <div className="col-md-4">
                      <h2>NewsLetter</h2>
                      <div className="inputs-container">
                        <input type="text" className="name" placeholder="Name..." />
                        <input type="email" className="email" placeholder="Email..." />
                        <button className="btn btn-danger">Subscribe</button>
                      </div>
                  </div>
              </div>
            </div>
           </footer> 
           
        </div>
    )
}

export default Home
