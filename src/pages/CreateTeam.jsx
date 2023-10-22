import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import teamService from '../appwrite/team';
import toast from 'react-hot-toast';
function CreateTeam() {
    const navigate = useNavigate();
  const { register, handleSubmit,} = useForm();
  const onSubmit=async (data)=>{
    try {
        console.log(data)
        const {teamname}=data
        const createdTeam= await teamService.createTeam(teamname)
        if(createdTeam){
             console.log("team created successfully",createdTeam)
                navigate("/my-teams")
                toast.success("Team created successfully")
        }
    } catch (error) {
        console.log("err during creating team",error)
    }
  }
  return (
    <div className="antialiased  text-gray-900 font-sans">
    <div className="flex items-center h-[80vh] w-full">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
      <span className="block w-full text-xl uppercase font-bold mb-4">Create A team</span>      
        <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 md:w-full">
            <label htmlFor="teamname" className="block text-xs mb-1">Team Name</label>
            <input className="w-full border rounded p-2 outline-none focus:shadow-outline"  type="text" name="teamname" id="teamname" placeholder=" Team Name"  {...register("teamname", {required: true,})}/>
          </div>
          {/* <div className="mb-6 md:w-full">
            <label htmlFor="description" className="block text-xs mb-1">Description</label>
            
            <textarea className="w-full border rounded p-2 outline-none focus:shadow-outline"name="description" id="description" placeholder="Description" {...register("description", { required:true})}>

            </textarea>
          </div> */}
          <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Create Team</button>
        </form>
      
    </div>
  </div>
</div>
  )
}

export default CreateTeam