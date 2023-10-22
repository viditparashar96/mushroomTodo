import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card, CardHeader, CardBody, CardFooter, Divider, Image,Button } from "@nextui-org/react"
import toast from 'react-hot-toast'
import ShareBtn from './ShareBtn'
import { set } from 'react-hook-form'
import Loader from './Loader/Loader'
function GetAllTodo() {
    const navigate=useNavigate()
    const [todos,setTodos] = useState([])
    const userData=useSelector((state)=>state.auth.userData)
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        if (userData) {
            const userId = userData.$id;
            service.getTodos(userId)
                .then((todos) => {
                    setLoading(true)
                    console.log("Todos", todos.documents);
                    setTodos(todos.documents);
                    setLoading(false)
                })
                .catch((err) => {
                    console.log("Error getting todos", err);
                }).finally(()=>setLoading(false));
        }
    }, [userData]);
    const handleEdit=()=>{
        console.log("Edit")

    }
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
    {loading?
    (
        <Loader/>
    )
    :
    (
        <div className=' flex items-center gap-6 mt-6 flex-wrap' >
        {todos?.map((todo,index)=>(
            <div className=' min-w-[300px]' key={index}>
  <Card className="md:min-w-[400px] min-w-[350px]  md:mx-0 bg-[#1c1c1c] text-white">
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
            <CardFooter className=" flex gap-3 justify-end">
                <Button color="danger" variant="flat" onClick={()=>{handleDelete(todo.$id)}} >
                    Delete
                </Button> 
                <Button   onClick={()=>navigate(`/edit-todo/${todo.$id}`)}  className="bg-gradient-to-r from-blue-400 to-purple-600 shadow-lg shadow-indigo-500/20" >
                    Update
                </Button>
                <ShareBtn todoId={todo.$id}/>
            </CardFooter>
        </Card>
            </div>
        ))

        }
       
    </div>
    )

    }
   </div>
  
  )
}

export default GetAllTodo