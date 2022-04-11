import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NavbarTop from './components/NavbarTop';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Profile from './pages/Profile'; 
import About from './pages/About';
import Category from './pages/Category';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Payment from './pages/Payment';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
     <Router>
     <NavbarTop />
       <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/sign-up' element={<SignUp />} />
         <Route path='/sign-in' element={<SignIn />} />
         <Route path='/category/:categoryName' element={<Category />} />
         <Route path='/forgot-password' element={<ForgotPassword />} />
         <Route path='/profile' element={<PrivateRoute />} >
            <Route path='/profile' element={<Profile />} />
         </Route>
         <Route path='/about' element={<About />} />
         <Route path='/create-listing' element={<CreateListing />} />
         <Route path='/category/:categoryName/:listingId' element={<Listing />} />
         <Route path='/payment/:listingId/:listingPrice' element={<Payment />} />
         <Route path='/contact/:landlordId' element={<Contact />} />
         <Route path='/shop' element={<PrivateRoute />}>
         <Route path='/shop' element={<Shop />} />
         </Route>
       </Routes>
     </Router>
     <ToastContainer />
    </>
  );
}

export default App;
