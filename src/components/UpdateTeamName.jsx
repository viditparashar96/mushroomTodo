import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import teamService from "../appwrite/team";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function UpdateTeamName({teamId}) {
    const navigate = useNavigate();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [name, setName] = React.useState("");
  console.log(name)
  console.log("teamId",teamId)
  const handleUpdate=()=>{
    teamService.updateTeam(teamId,name).then((res)=>{
        console.log("Team Name updated successfully",res)
        navigate("/my-teams")
        toast.success("Team Name updated successfully")
    }).catch((err)=>{
        console.log("err during updating team name",err)
        toast.error("err during updating team name")
    })
}
  return (
    <>
      
      <Button onPress={onOpen} className="bg-gradient-to-r from-blue-400 to-purple-600 shadow-lg shadow-indigo-500/20">
                        Update Name
                    </Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Update Name</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                type="text"
                  label="Name"
                  placeholder="Enter New Team name"
                  variant="bordered"
                  onChange={(e) => setName(e.target.value)}
                />
                
               
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleUpdate} onPress={onClose}>
                 Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
