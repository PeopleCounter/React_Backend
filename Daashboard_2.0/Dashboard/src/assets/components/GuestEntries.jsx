import { useEffect } from "react"
import { useState } from "react"
import '../css/GuestEntries.css'
function GuestEntries() {

    let [guests,set_guests] = useState({Name:[],number:[]}) 
    useEffect(()=>{
        async function fetchGuest(){

            let res =  await fetch('http://localhost:3000/logs/getGuestUsers',{
                headers:{"Content-Type":"application/json"},
                method:"GET"
            }).then((res)=>{
                return res.json()
            })
            
            let names = []
            let number = []
            for (let index = 0; index < res.length; index++) {
                

                names.push(res[index].name)
                number.push(res[index].number)
            }
            
            set_guests((state)=>(
                {
                   ...state, Name:names,number:number
                }
            ))



           
        }

        fetchGuest()
    },[])
  return (
    <>
       
        <table>
            <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Number
                    </th>
                </tr>
            </thead>
            <tbody>
                
                    {guests.Name.map((element,i)=>(
                         <tr style={{height:"20px"}} key={i}>       
                                <td >{element}</td>
                                <td>{guests.number[i]}</td>
                        </tr>
                        
                    )

                    )}


                
            </tbody>
        </table>
    </>
  )
}

export default GuestEntries