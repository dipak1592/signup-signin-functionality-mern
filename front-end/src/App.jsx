import {Routes,Route, Navigate} from "react-router-dom"
import './App.css'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import { useState } from "react"
import RefrshHandler from "./Refreshhandler.jsx"

function App() {
  
  const [isAuthenticated,setIsAuthenticated] = useState(false);

  const privateroute = ({element}) =>{
    return isAuthenticated ? element : <Navigate to="/login" />
  }
  return (
    <>
      <div className='App'>
        <RefrshHandler setIsAuthenticated={setIsAuthenticated}/>
          <Routes>
            <Route path="/" element={<Navigate to="/home"></Navigate>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/home" element={<privateroute element={<Home/>}/>}/>
          </Routes>
      </div>
    </>
  )
}

export default App
