import React from 'react';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import { login as authLogin } from './store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

function LoginComponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const { register, handleSubmit,} = useForm();
  const handleLogin=async(data)=>{
        try {
            console.log(data)
            const session=await authService.login(data)
            if(session){
                const userData =await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                navigate("/")
              toast.success('Logged in successfully')
            }
        } catch (error) {
            console.log("err during login",error)
            toast.error(error.message)
        }
  }
  return (
    // <div>
    //       <form onSubmit={handleSubmit(handleLogin)}>
    //   <input type="text" placeholder="Email" {...register("email", {required: true,})} />
    //   <input type="password" placeholder="Password" {...register("password", { required:true})} />
    //   <input type="submit" />
    // </form>


    // </div>
    <div className="antialiased  text-gray-900 font-sans">
    <div className="flex items-center h-[80vh] w-full">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
      <span className="block w-full text-xl uppercase font-bold mb-4">Login</span>      
        <form className="mb-4" onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4 md:w-full">
            <label htmlFor="email" className="block text-xs mb-1">Username or Email</label>
            <input className="w-full border rounded p-2 outline-none focus:shadow-outline"  type="email" name="email" id="email" placeholder=" Email"  {...register("email", {required: true,})}/>
          </div>
          <div className="mb-6 md:w-full">
            <label htmlFor="password" className="block text-xs mb-1">Password</label>
            <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Password" {...register("password", { required:true})}/>
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Login</button>
        </form>
        <a className="text-blue-700 text-center text-sm" href="/login">Forgot password?</a>
    </div>
  </div>
</div>
  )
}

export default LoginComponent