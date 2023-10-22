import React from 'react';
import { useForm } from 'react-hook-form';
import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function CreateTodo() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const userData = useSelector((state) => state.auth.userData);
  const onSubmit = async(data)=>{
    try {
        console.log(data);
        const dbTodo=await service.createTodo({...data,userId:userData.$id})
        if(dbTodo){
            console.log("Todo created successfully",dbTodo)
            toast.success("Todo created successfully")
            navigate('/all-todos')
        }
    } catch (error) {
        console.log("Error creating todo",error)
    }
  }
  console.log(errors);
  
  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input type="text" placeholder="Title" {...register("title", {required: true})} />
    //   <input type="text" placeholder="Content" {...register("content", {required: true})} />
    //   <select {...register("status")}>
    //     <option value="Due">Due</option>
    //     <option value="Pending">Pending</option>
    //     <option value="Completed">Completed</option>
    //   </select>

    //   <input type="submit" />
    // </form>
    <div className="antialiased  text-gray-900 font-sans">
    <div className="flex items-center h-[80vh] w-full">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
      <span className="block w-full text-xl uppercase font-bold mb-4">ADD TODO</span>      
        <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 md:w-full">
            <label htmlFor="title" className="block text-xs mb-1">Title</label>
            <input className="w-full border rounded p-2 outline-none focus:shadow-outline"  type="text" name="title" id="title" placeholder=" Title"  {...register("title", {required: true})}/>
          </div>
          <div className="mb-6 md:w-full">
            <label htmlFor="content" className="block text-xs mb-1">Content</label>
            <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="text" name="content" id="content" placeholder="Content" {...register("content", {required: true})}/>
          </div>
          <div className="mb-4 md:w-full">
            <label htmlFor="status" className="block text-xs mb-1">Status</label>
               <select  className="w-full border rounded p-2 outline-none focus:shadow-outline" name="status" id="status" {...register("status")} >
         <option value="Due">Due</option>
         <option value="Pending">Pending</option>
         <option value="Completed">Completed</option>
     </select>
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Add</button>
        </form>
        
    </div>
  </div>
</div>
  );
}