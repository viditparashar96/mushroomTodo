import React, { useEffect, useState } from 'react'
import teamService from '../appwrite/team'
import { Link, useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image,Button } from "@nextui-org/react"
import Loader from '../components/Loader/Loader'
import { TeamMembers } from '../components'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
function Team() {
    const navigate=useNavigate()
    const { register, handleSubmit,} = useForm();
    const [team,setTeam]=useState({})
    const [members,setMembers]=useState([])
    const [todos,setTodos]=useState([])
    const [loading,setLoading]=useState(false)
    console.log(members)
    const {teamId}= useParams()
    console.log("teamId",teamId)
    // console.log("members",members)
    const userData=useSelector((state)=>state.auth.userData)
    useEffect(()=>{
        try {
            setLoading(true)
            teamService.getTeam(teamId).then((res)=>{
                if(res){
                    console.log("team",res)
                    setTeam(res)
                teamService.getMembers(res.$id).then((res)=>{
                    console.log("members",res)
                    setMembers(res.memberships)
                    setLoading(false)
                }).catch((err)=>{
                    console.log("err during fetching members",err)
                    setLoading(false)
                })

                }
            }).catch((err)=>{
                console.log("err during fetching team",err)
                
            }).finally(()=>setLoading(false))
            
        } catch (error) {
            console.log("err during fetching team",error)
        }
    },[])
    useEffect(()=>{
        service.getSharedTodosForTeam(teamId).then((res)=>{
            console.log("shared todos",res.documents)
            setTodos(res.documents)
        })
        .catch((err)=>{console.log("err during fetching shared todos",err)})
    },[])
    const handleDelete=(todoId)=>{
        service.deleteTodo(todoId).then((res)=>{
               console.log("Todo deleted successfully",res)
               setTodos(todos.filter((todo)=>todo.$id!==todoId))
               toast.success("Todo deleted successfully")
        })
        .catch((err)=>{
            console.log("Error deleting todo",err)
            toast.error("Error deleting todo")
        })
         
     }
  return (
    <div>

    {loading ?
        (
            

            <Loader/>
            
        )
        :
        (
            <div className='w-full flex flex-col md:flex-row'>

            <div className=' min-h-[80vh] w-[80%] '>
            <div className=' w-full p-3 text-4xl text-center'>
                <h1 className=' font-bold'>{team.name}</h1>
            </div>
            <div className=' w-full p-4 text-center'>

            <Link to={`/addmember/${teamId}`} className=' border w-fit px-3 py-2 rounded-sm hover:bg-purple-500 transition-all duration-700'>Add Member</Link>
            </div>
           
            <div className=' bg-yellow-400'>
              
            </div>
            <div>
                <h1 className=' text-xl ml-3 font-semibold'>
    
                Shared Todos:
                </h1>
                
                <div className=' flex items-center gap-6 mt-6 flex-wrap'>
                {todos.length===0&& (
                    <h1 className=' text-2xl font-semibold text-center'>No Todos Found</h1>
                )}
                {todos.map((todo,index)=>{
                    return(
                        <div className=' min-w-[300px]' key={index}>
                        <Card className="md:min-w-[400px] min-w-[350px]   md:mx-0 bg-[#1c1c1c] text-white">
                                  <CardHeader className="flex gap-3">
                                      <Image
                                          alt="nextui logo"
                                          height={40}
                                          radius="sm"
                                          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                          width={40}
                                      />
                                      <div className="flex flex-col">
                                          <p className="text-md">{todo.title}</p>
                                          <p className="text-small text-default-500">Todo app.</p>
                                      </div>
                                  </CardHeader>
                                  <Divider />
                                  <CardBody>
                                      <p>{todo.content}</p>
                                  </CardBody>
                                  <div>
                                  {todo.status==="Due"&&
                                          <Button color="danger" className=" ml-4 border" variant="bordered" >
                                          {todo.status}
                                        </Button>
                                  }
                                   {todo.status==="Pending"&&
                                          <Button color="warning" className=" ml-4 border" variant="bordered" >
                                          {todo.status}
                                        </Button>
                                  }
                                   {todo.status==="Completed"&&
                                          <Button color="success" className=" ml-4 border" variant="bordered" >
                                          {todo.status}
                                        </Button>
                                  }
                              
                                  </div>
                                  <Divider />
                                  {members[0]?.roles[0]==="owner"&& members[0]?.userId===userData.$id &&
                                 <CardFooter className=" flex gap-3 justify-end">
                                 <Button color="danger" variant="flat" onClick={()=>{handleDelete(todo.$id)}} >
                                     Delete
                                 </Button> 
                                 <Button   onClick={()=>navigate(`/edit-todo/${todo.$id}`)}  className="bg-gradient-to-r from-blue-400 to-purple-600 shadow-lg shadow-indigo-500/20" >
                                     Update
                                 </Button>
                                 
                             </CardFooter>
                                  }
                              </Card>
                                  </div>
                    )
                
                })
    
                }
                </div>
    
    
            </div>
        </div>
        <div className='md:w-[20%] w-full  min-h-[80vh]'>
            <TeamMembers members={members} setMembers={setMembers} teamId={teamId}/>
        </div>
        </div>

        )

    }
    </div>

    
  )
}

export default Team