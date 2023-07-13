import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./assets/components/Navbar"
import Home from "./assets/components/Home"
import Login from "./assets/components/Login"
import { useEffect, useState } from "react"
import BootstrapErrors from "./assets/components/bootstrapErrors";
// import Logout from "./assets/components/Logout"
import Socket from "./assets/js/Socket"
function App()
{
  const [notifications,set_notifications] = useState({
    notification:null,
    message:null
  })

  const[counts,set_counts] = useState({"in":0,"out":0})
  useEffect(()=>
  {
      function check_counts(value)
      {
        set_counts(value)
      }

      Socket.on("Update",check_counts)

      return(
        ()=>{
          Socket.off("Update",check_counts)
        }
      )
  },[]
  )

  return(
    <>
      <BrowserRouter>
        <Navbar />
        <BootstrapErrors notifications={notifications} control = {set_notifications}/>
        <Routes>
          
          <Route path="/Home" element={<Home counts = {counts}/>}/>
          <Route path="/" element={<Login notifications={notifications} control = {set_notifications}/>}/>
          {/* <Route path="/Logout" element={<Logout CSRF = {credentials} func = {set_credentials}/>}/> */}
        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App