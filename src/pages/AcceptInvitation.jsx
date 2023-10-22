import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import teamService from '../appwrite/team';

function AcceptInvitation() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const teamId = urlParams.get('teamId');
        const membershipId = urlParams.get('membershipId');
        const userId = urlParams.get('userId');
        const secret = urlParams.get('secret');

        // Use the extracted values as needed
        console.log('Team ID:', teamId);
        console.log('Membership ID:', membershipId);
        console.log('User ID:', userId);
        console.log('Secret:', secret);
        teamService.acceptInvitation(teamId,membershipId,userId,secret).then((res)=>{
            console.log("invitation accpeced",res)
        }).catch((err)=>{
            console.log("err",err)
        })
        // Perform further actions with the extracted values

    }, []); // Empty dependency array to ensure the effect runs only once on mount
  return (
    <div className=' w-full min-h-[80vh] flex items-center justify-center'>
      <h1 className=' text-4xl font-semibold'>Welcome To Our Team</h1>
    </div>
  )
}

export default AcceptInvitation