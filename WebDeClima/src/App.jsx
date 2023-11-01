import {BrowserRouter, Routes, Route, Router} from "react-router-dom"
import {UserProvider} from "./context/UserProvider" 
import './App.css'
import Registration from "./Registration/Registration.jsx";
import NavBar from './NavBar/Navbar'
import Login from "./Login/Login";
import Home from "./Home/Home"
import SignOut from './SignOut';
/* import LocationWeather from "./LocationWeather/LocationWeather"; */
import Forecast from "./Forecast";
import { Logo } from "./logo/Logo";


function App() {
  return (
    <>
     <div id="App" className="container AppContainer d-flex ">
      <UserProvider>
        <BrowserRouter>
        <Logo/>
        <nav className=""><NavBar /></nav>
        <div className="w-100">
          <Routes>
            <Route path='/' element={<Registration/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/signOut' element={<SignOut/>}/>
            {/* <Route path='/locationWeather' element={<LocationWeather/>}/> */}
           
          </Routes>
          </div>
        </BrowserRouter>
      </UserProvider>
     </div>
    </>
  )
}


export default App



