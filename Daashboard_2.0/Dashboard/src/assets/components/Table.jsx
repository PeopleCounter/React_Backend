import { useReactTable } from '@tanstack/react-table'
import React, { useEffect, useMemo } from 'react'

export default function Table() {

    useEffect(()=>{
        async function getUsers(){

            await fetch('http://localhost:3000/logs/getGuestUsers',{
                headers:{"Content-Type":"application/json"},
                method:"GET"
            }).then((res)=>{
                if(res){
                    return res.json()
                }
            })
        }
        getUsers()
    },[])

    const columns = useMemo(()=>(
        [
            {
                Header:"Name",
                accessor:"name"
            },
            {
                Header:"Number",
                accessor:"number"
            }
        ]
    ),[])

    const Data = useMemo(()=>(
        [
            {
                Header:"Name",
                accessor:"name"
            },
            {
                Header:"Number",
                accessor:"number"
            }
        ]
    ),[])

    const tableInstance = useReactTable({columns:columns})
  return (
    <div>Table</div>
  )
}
