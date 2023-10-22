import React from 'react'

function TeamMembers({members,setMembers}) {
    console.log("members",members)
  return (
    <div className=' p-4 space-y-4'>
        <h1 className=' text-2xl font-semibold'>Team Members:</h1>
        {members.map((member,index)=>{
            return(
                <div className='flex items-center justify-between' key={index}>
                    <h1>{member.userName}</h1>
                    {member.confirm?
                    (<h1 className=' text-sm opacity-50'>Confirmed</h1>)
                    :
                    (<h1 className=' text-sm opacity-50'>Not Confirmed</h1>)

                    }
                </div>
            )
        })

        }
    </div>
  )
}

export default TeamMembers