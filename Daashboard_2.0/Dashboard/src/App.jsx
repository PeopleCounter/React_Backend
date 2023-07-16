import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./assets/components/Navbar"
import Home from "./assets/components/Home"
import Login from "./assets/components/Login"
import { useEffect, useState } from "react"
import BootstrapErrors from "./assets/components/bootstrapErrors";
// import Logout from "./assets/components/Logout"
import LogDetails from "./assets/components/LogDetails"
import Socket from "./assets/js/Socket"
function App()
{
  const [notifications,set_notifications] = useState({
    notification:null,
    message:null
  })

  const[counts,set_counts] = useState({"in":0,"out":0})
  const[counts_face,set_counts_face] = useState({"student":0,"teacher":0,"unknown":0})
  useEffect(()=>
  {
      function check_counts(value)
      {
        set_counts(value)
      }

      function check_counts_face(value)
      {
        set_counts_face(value)
      }

      Socket.on("Update",check_counts)
      Socket.on("Update_FaceDetection",check_counts_face)

      return(
        ()=>{
          console.log("Switching off connection");
          Socket.off("Update",check_counts)
          Socket.off("Update_FaceDetection",check_counts_face)
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
          
          <Route path="/Home" element={<Home counts = {counts} counts_face={counts_face}/>}/>
          <Route path="/" element={<Login notifications={notifications} control = {set_notifications}/>}/>
          <Route path="/LogDetails/:id" element={<LogDetails/>}/>
          {/* <Route path="/Logout" element={<Logout CSRF = {credentials} func = {set_credentials}/>}/> */}
        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App