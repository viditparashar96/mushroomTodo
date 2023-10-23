import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';
import service from '../appwrite/config';
import toast from 'react-hot-toast';
import Loader from '../components/Loader/Loader';

function EditTodo() {
    const { slug } = useParams();
    const [todo, setTodo] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true);
        service.getTodo(slug)
            .then((res) => {
                setTodo({
                    title: res.title,
                    content: res.content,
                    status: res.status
                });
                reset({
                    title: res.title,
                    content: res.content,
                    status: res.status
                });
                setLoading(false);
            })
            .catch((err) => console.log("Error getting todo", err)).finally(()=>setLoading(false));
    }, [slug, reset]);

    const onSubmit = async (data) => {
        try {
            console.log(data);
            const updatedTodo=await service.updateTodo(slug,{...data})
            if(updatedTodo){
                console.log("Todo updated successfully",updatedTodo)
                navigate('/all-todos')
                toast.success("Todo updated successfully")
            }
        } catch (error) {
            console.log("Error in updating todo", error);
        }
    };

    return (
        // <form onSubmit={handleSubmit(onSubmit)}>
        //     <input type="text" placeholder="Title" {...register("title", { required: true })} />
        //     <input type="text" placeholder="Content" {...register("content", { required: true })} />
        //     <select {...register("status")}>
        //         <option value="Due">Due</option>
        //         <option value="Pending">Pending</option>
        //         <option value="Completed">Completed</option>
        //     </select>

        //     <input type="submit" />
        // </form>
        <div>
          {loading ? 
          (<Loader/>)
          :
          (  <div className="antialiased  text-gray-900 font-sans">
          <div className="flex items-center h-[80vh] w-full">
            <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
            <span className="block w-full text-xl uppercase font-bold mb-4">Update todo</span>      
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
                <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Update</button>
              </form>
              
          </div>
        </div>
      </div>)

          }

      
    </div>

    );
}

export default EditTodo;
