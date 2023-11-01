import {BrowserRouter, Routes, Route, Router} from "react-router-dom"
import {UserProvider} from "./context/UserProvider" 
import './App.css'
import Registration from "./Registration/Registration.jsx";
import NavBar from './NavBar/Navbar'
import Login from "./Login/Login";
import Home from "./Home/Home"
import SignOut from './SignOut';
import Forecast from "./Forecast";


function App() {
  return (
    <>
     <div id="App" className="container AppContainer d-flex p-0 m-0"  style={{ position: 'relative' }}>
      <UserProvider>
        <BrowserRouter>
        <nav className="m-0 p-0" style={{ position: 'absolute'}}><NavBar /></nav>
        <div className="w-100" style={{}}>
          <Routes>
            <Route path='/' element={<Registration/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/signOut' element={<SignOut/>}/>
            <Route path='/forecast' element={<Forecast/>}/>
            {/* <Route path='/forecast/:city' element={<Forecast/>}/> */}
          </Routes>
          </div>
        </BrowserRouter>
      </UserProvider>
     </div>
    </>
  )
}


export default App



