import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Protected({ children ,authenticaion=true}) {

    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const authStatus=useSelector(state=>state.auth.status)
    useEffect(()=>{
         //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false


        if(authenticaion && authStatus!==authenticaion){
            navigate('/login')
        }else if(!authenticaion && authStatus!==authenticaion){
            navigate('/')

        }
        setLoader(false)


    },[authStatus,navigate,authenticaion])


  return loader ? <div>loading...</div> : <>{children}</>
}

