import React, { useEffect, useState } from 'react'
import { LogoutBtn } from "../index"
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineMenu ,AiOutlineClose} from 'react-icons/ai'
import './Header.css'
function Header() {
  const authStatus=useSelector((state)=>state.auth.status)
  const navigate=useNavigate()
  const location = useLocation();
  const [menu,setMenu]=useState(false)
  console.log(menu)
  const toggleMenu=()=>{
    setMenu(!menu)

  }
  useEffect(() => {
    setMenu(false); // Hide the menu on location change
  }, [location]);
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Todos",
      slug: "/all-todos",
      active: authStatus,
  },
  {
      name: "Add Todo",
      slug: "/add-todo",
      active: authStatus,
  },
  {
    name: "Create Team",
    slug: "/create-team",
    active: authStatus,
},
{
  name: "My Teams",
  slug: "/my-teams",
  active: authStatus,
},

  ]

  return (
    <header className='p-4 shadow bg-[#222121] relative'>
      <div>
        <nav className=' flex items-center justify-between'>
          <div className='mr-4'>
          <Link to='/'>
            LOGO
          </Link>
          </div>
          <ul className=' hidden md:flex ml-auto'>
            {navItems.map((item,index)=>
              item.active ?
              ( 
                <li key={index} className='mx-3'>
                  <button onClick={()=>navigate(item.slug)} className='inline-bock px-6 py-2 duration-200 hover:bg-purple-500 rounded-full'>{item.name}</button>
                </li>
              )
              :
              null
            )

            }
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          <div className='md:hidden block'>
            <AiOutlineMenu onClick={toggleMenu}/>
          </div>
          <div className={`menu-mobile ${menu ? 'open' : ''} p-4`}>
            <div className="flex items-center justify-end mr-4">
              <AiOutlineClose onClick={toggleMenu} />
            </div>
            <ul className=' ml-auto'>
            {navItems.map((item,index)=>
              item.active ?
              ( 
                <li key={index} className='mx-3'>
                  <button onClick={()=>navigate(item.slug)} className='inline-bock px-6 py-2 duration-200 hover:bg-purple-500 rounded-full'>{item.name}</button>
                </li>
              )
              :
              null
            )

            }
            {authStatus && (
              <li className=' ml-3'>
                <LogoutBtn />
              </li>
            )}
          </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header