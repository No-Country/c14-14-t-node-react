import {BrowserRouter, Routes, Route, Router} from "react-router-dom"
import './App.css'
import Registration from "./Registration.jsx";
import Login from "./Login";

function App() {
  return (
    <>
     <div id="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Registration/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
     </div>
    </>
  )
}


export default App



