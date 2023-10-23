import React, { useEffect, useState } from 'react'
import teamService from '../appwrite/team'
import { Link } from 'react-router-dom'
import { set } from 'react-hook-form'
import Loader from '../components/Loader/Loader'
import service from '../appwrite/config'
import authService from '../appwrite/auth'

function MyTeams() {
  const [teams,setTeams]=useState([])
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    try {
      setLoading(true)
      teamService.getTeams().then((res)=>{
        console.log("teams",res)
        setLoading(false)
        setTeams(res.teams)
        
      }).catch((err)=>{
        console.log("err during fetching teams",err)
        setLoading(false)
      })
    } catch (error) {
      console.log("err during fetching teams",error)
      setLoading(false)
    }
  },[])
  useEffect(()=>{
    authService.getCurrentUser().then((res)=>{
      console.log("user",res)
    
    }).catch((err)=>{
      console.log("err during fetching user",err)
    })
  },[])

  return (
    <div>

    {loading ?
      (<Loader/>)
      :
      (
        <div className=' w-full md:w-6/12 mx-auto mt-10 min-h-[80vh] space-y-10'>
          {teams.length===0 && (
            <h1 className=' text-2xl font-semibold text-center'>No Teams Found</h1>
          
          )}
        {teams.map((team,index)=>
        <Link key={index} to={`/team/${team.$id}`} className=' my-4'>
          <div  className=' w-full p-4 bg-[#202020] my-4 hover:bg-purple-600 transition-all duration-700 cursor-pointer '>
            <h1>{team.name}</h1>
          </div>
          </Link>
        )
  
        }
        
      </div>
      )

    }
    </div>
  
  )
}

export default MyTeams