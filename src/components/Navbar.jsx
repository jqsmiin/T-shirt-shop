import { useNavigate, useLocation } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const pathMatchRoute = (route) =>{
      if(route === location.pathname){
          return true;
      }
  }
 
    return (
       <footer className="main-footer">
           <ul className="main-list">
               <li style={{
                 color : pathMatchRoute('/') ? 'red' : '#000'
               }
               } onClick={() => navigate('/')}>Home</li>
               <li style={{
                 color : pathMatchRoute('/about') ? 'red' : '#000'
               }
               } onClick={() => navigate('/about')}>About</li>
               <li style={{
                 color : pathMatchRoute('/profile') ? 'red' : '#000'
               }
               } onClick={() => navigate('/profile')}>Profile</li>
           </ul>
       </footer>
    )
}

export default Navbar