import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./assets/components/Navbar"
import Home from "./assets/components/Home"
import Login from "./assets/components/Login"
import { useState } from "react"
import BootstrapErrors from "./assets/components/bootstrapErrors";
// import Logout from "./assets/components/Logout"

function App()
{
  const [notifications,set_notifications] = useState({
    notification:null,
    message:null
  })

  return(
    <>
      <BrowserRouter>
        <Navbar />
        <BootstrapErrors notifications={notifications} control = {set_notifications}/>
        <Routes>
          
          <Route path="/" element={<Home/>}/>
          <Route path="/authenticate" element={<Login notifications={notifications} control = {set_notifications}/>}/>
          {/* <Route path="/Logout" element={<Logout CSRF = {credentials} func = {set_credentials}/>}/> */}
        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App