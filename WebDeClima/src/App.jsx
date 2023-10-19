import {BrowserRouter, Routes, Route, Router} from "react-router-dom"
import {UserProvider} from "./context/UserProvider" 
import './App.css'
import Registration from "./Registration/Registration.jsx";
import NavBar from './NavBar/Navbar'
import Login from "./Login/Login";
import Home from "./Home/Home"
import SignOut from './SignOut';

function App() {
  return (
    <>
     <div id="App" className="container-fluid align-items-center">
      <UserProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Registration/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/signOut' element={<SignOut/>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
     </div>
    </>
  )
}


export default App



