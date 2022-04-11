import { useNavigate, useLocation } from "react-router-dom"

function NavbarTop() {

  const navigate = useNavigate()
  const location = useLocation()

  const pathMatchRoute = (route) =>{
      if(route === location.pathname){
          return true;
      }
  }

    return (
        <div className="container">
         <nav className="navbar navbar-expand-lg navbar-light">
  <div className="container-fluid">
    <h3 className="navbar-brand logo">T-shirt <span className="red">Shop</span></h3>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
      <div className="navbar-nav">
      <ul className="navbarList"> 
                    <li style={{
                 color : pathMatchRoute('/') ? 'red' : '#000'
               }
               } onClick={() => navigate('/')}>Home</li>
                    <li style={{
                 color : pathMatchRoute('/create-listing') ? 'red' : '#000'
               }
               } onClick={() => navigate('/create-listing')}>Sell Your Art !</li>
                        <li style={{
                 color : pathMatchRoute('/about') ? 'red' : '#000'
               }
               } onClick={() => navigate('/about')}>About</li>
               <li style={{
                 color : pathMatchRoute('/profile') ? 'red' : '#000'
               }
               } onClick={() => navigate('/profile')}><i className="fa-solid fa-user"></i></li>
               <li style={{
                 color : pathMatchRoute(`/shop`) ? 'red' : '#000'
               }
               } onClick={() => navigate(`/shop`)}><i className="fa-solid fa-tag"></i></li>
                    </ul>
      </div>
    </div>
  </div>
</nav>
        </div>
    )
}

export default NavbarTop
