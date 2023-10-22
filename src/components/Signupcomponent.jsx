import React from 'react';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import { login } from './store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

export default function Signupcomponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const { register, handleSubmit,} = useForm();
  const onSubmit=async(data)=>{
    console.log(data)
    try {
        const userData=await authService.createAccount(data)
        if(userData){
           const userData=await authService.getCurrentUser()
           if(userData) dispatch(login(userData))
           navigate("/")
          toast.success('Logged in successfully')
        }


    } catch (error) {
        console.log("err during signup",error.message)
        toast.error(error.message)
    }
  }
  
  
  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input type="text" placeholder="Name" {...register("name", {required: true})} />
    //   <input type="text" placeholder="Email" {...register("email", {required: true,})} />
    //   <input type="password" placeholder="Password" {...register("password", { required:true})} />

    //   <input type="submit" />
    // </form>
    <div className="antialiased  text-gray-900 font-sans">
    <div className="flex items-center h-[80vh] w-full">
      <div className="w-full bg-[#fff] rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
      <span className="block w-full text-xl uppercase font-bold mb-4">Register</span>      
        <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 md:w-full">
            <label htmlFor="name" className="block text-xs mb-1">Name</label>
            <input className="w-full border rounded p-2 outline-none focus:shadow-outline"  type="text" name="name" id="name" placeholder=" Name" {...register("name", {required: true})}/>
          </div>
          <div className="mb-4 md:w-full">
            <label htmlFor="email" className="block text-xs mb-1">Username or Email</label>
            <input className="w-full border rounded p-2 outline-none focus:shadow-outline"  type="email" name="email" id="email" placeholder=" Email"  {...register("email", {required: true,})}/>
          </div>
          <div className="mb-6 md:w-full">
            <label htmlFor="password" className="block text-xs mb-1">Password</label>
            <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Password" {...register("password", { required:true})}/>
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Register</button>
        </form>
    
    </div>
  </div>
</div>

  );
}