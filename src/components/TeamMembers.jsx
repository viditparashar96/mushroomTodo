import { Button } from '@nextui-org/react';
import React from 'react';
import { useSelector } from 'react-redux';
import teamService from '../appwrite/team';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import UpdateTeamName from './UpdateTeamName';

function TeamMembers({ members, setMembers ,teamId}) {
    const navigate = useNavigate();
    const userData=useSelector((state)=>state.auth.userData)

    const handleDelete=()=>{
        teamService.deleteTeam(teamId).then((res)=>{
            console.log("Team deleted successfully",res)
            navigate("/my-teams")
            toast.success("Team deleted successfully")
        }).catch((err)=>{
            console.log("err during deleting team",err)
            toast.error("err during deleting team")
        })
    }
   

    return (
        <div className=' p-4 space-y-4 flex flex-col relative  min-h-[80vh]'>
            <h1 className=' text-2xl font-semibold'>Team Members:</h1>
            {members.map((member, index) => {
                return (
                    <div className='flex items-center justify-between' key={index}>
                        <h1>{member.userName}</h1>
                        {member.confirm ? (
                            <h1 className=' text-sm opacity-50'>Confirmed</h1>
                        ) : (
                            <h1 className=' text-sm opacity-50'>Not Confirmed</h1>
                        )}
                    </div>
                );
            })}
            {members[0]?.roles[0]==="owner"&& members[0]?.userId===userData.$id && (
                <div className=' absolute bottom-3 right-2 space-x-4'>
                    <Button color="danger" variant="flat" onClick={handleDelete}>
                        Delete Team
                    </Button>
                   <UpdateTeamName teamId={teamId}/>
                </div>
            )}
        </div>
    );
}

export default TeamMembers;
