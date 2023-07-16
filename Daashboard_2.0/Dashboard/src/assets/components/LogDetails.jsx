import { useEffect } from "react";
import { useParams } from "react-router-dom";
function LogDetails()
{
    const {id} = useParams()
    useEffect(()=>{
        let timr = setInterval(
        async ()=>{
            await fetch(`http://localhost:3000/logs/general/${id}`,{
                headers:{"Content-Type":"application/json"},
                method:"GET"
            }).catch((err)=>{
                console.log(err)
            }).then((data)=>{
                return data.json()
            }).then((data)=>
            {
                console.log(data,id)
            })
        },(5*1000)
    )
    
    return(
        ()=>{
            console.log("ok");
            clearInterval(timr)
        }
    )
    },[id])
    
    return(
    <>
    
        <div id="div1"></div>
        <div id="div2"></div>
        <div id="div3"></div>
        
       
  
    </>
)}

export default LogDetails