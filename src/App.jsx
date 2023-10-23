import React, { useEffect, useState } from 'react'
import conf from './conf/conf'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login,logout } from './components/store/authSlice'
import { Header,Footer, Protected } from './components'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddTodo from './pages/AddTodo'
import AllTodos from './pages/AllTodos'
import EditTodo from './pages/EditTodo'
import CreateTeam from './pages/CreateTeam'
import MyTeams from './pages/MyTeams'
import Team from './pages/Team'
import AddMember from './pages/AddMember'
import AcceptInvitation from './pages/AcceptInvitation'
import UpadateTeam from './pages/UpadateTeam'
function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(()=>{
    authService.getCurrentUser()
    .then((user)=>{
      if(user){
        dispatch(login(user))
      }else{
        dispatch(logout())
      }
    })
    .catch((err)=>{
      console.log("Error getting current user",err)
    }).finally(()=>setLoading(false))
  })
  return !loading ? 
  (<div className=' min-h-screen flex flex-wrap content-between bg-[#141313] text-white overflow-x-hidden'>
    
    <div className=' w-full block'>
    <Header/>
    <main>
      {/* Outlet */}
      {/* <Outlet/> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
         <Route path='/login' element={<Login/>}/> 
         <Route path='/signup' element={<Signup/>}/> 
         <Route path='/add-todo' element={<Protected><AddTodo/></Protected>}/> 
         <Route path='/all-todos' element={<Protected><AllTodos/></Protected>}/> 
        <Route path='/edit-todo/:slug' element={<Protected><EditTodo/></Protected>}/>
        <Route path='/create-team' element={<Protected><CreateTeam/></Protected>}/>
        <Route path='/my-teams' element={<Protected><MyTeams/></Protected>}/>
        <Route path='/team/:teamId' element={<Protected><Team/></Protected>}/>
        <Route path='/addmember/:teamId' element={<Protected><AddMember/></Protected>}/>
        <Route path='/updateteam' element={<Protected><UpadateTeam/></Protected>}/>

        <Route path='/acceptinvitation' element={<AcceptInvitation/>}/>






      </Routes>
    </main>
    <Footer/>
    </div>
  </div>)
  :
  null
}

export default App
