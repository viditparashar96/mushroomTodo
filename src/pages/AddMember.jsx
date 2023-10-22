import React from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import teamService from '../appwrite/team'
import toast from 'react-hot-toast';

function AddMember() {
    const { register, handleSubmit,} = useForm();
    const {teamId}= useParams()

    const onSubmit=async (data)=>{
        try {
           const {email}=data
           const userId="653360b086b77eb5e51d"
            teamService.addMember(teamId,["owner"],userId,email).then((res)=>{
                console.log("added",res)
                toast.success("Invite sent successfully")
               
            }).catch((err)=>{
                console.log("err during adding member",err)
            })
        } catch (error) {
            console.log("err during sending invite",error)
        }
    }
  return (
    <div className=' w-full min-h-[80vh] flex items-center justify-center'>
         <form className="mb-4 w-3/12 mx-auto text-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4   ">
            <label htmlFor="email" className="block text-xs mb-1">Email</label>
            <input
    className="text-black w-full border rounded p-2 outline-none focus:shadow-outline"
    type="email"
    name="email"
    id="email"
    placeholder=" Email"
    {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
/>
          </div>
         
          <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Send Invite</button>
        </form>
    </div>
  )
}

export default AddMember