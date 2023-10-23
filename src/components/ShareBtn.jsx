import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import teamService from "../appwrite/team";
import service from "../appwrite/config";
import toast from "react-hot-toast";

export default function ShareBtn({todoId}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [teams,setTeams]=useState([])
  useEffect(()=>{
    teamService.getTeams().then((res)=>{
      console.log("teams",res)
      setTeams(res.teams)
    }).catch(err=>console.log("err during fetching teams",err))
  },[])
  const handleShare=(teamId)=>{
    console.log("Share",teamId)
    service.shareTodoWithTeam(todoId,teamId).then((res)=>{
      console.log("Todo shared successfully",res)
      toast.success("Todo shared successfully")
    }).catch((err)=>{
      console.log("err during sharing todo",err)
    })
  }
  return (
    <>
      <Button color="primary" variant="flat" onPress={onOpen} >
                   Share
                </Button> 
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} className=" bg-[#141414] text-white">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
               {teams.map((team,index)=>
                (
                  <div className=" flex items-center justify-between" key={index}>
                    <p>{team.name}</p>
                      <Button color="primary" variant="flat" onClick={()=>handleShare(team.$id)} >
                   Share
                </Button> 
                  </div>
                )
               )

               }
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
