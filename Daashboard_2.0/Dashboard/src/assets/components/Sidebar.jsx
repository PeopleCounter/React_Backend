// import React from 'react'
import { Outlet } from "react-router-dom";
import "../css/Sidebar.css"
function Sidebar() {
  return (
    <>


        <div className="wrapper-bar">
            <div className="sideBar">
                {/* <div className="feature" style={{position:'relative',top:'20vh',left:"3vh",color:"#fff"}}>
                    Dashboard
                </div> */}
            </div>
            <Outlet/>
        </div>

    </>
    )
}

export default Sidebar