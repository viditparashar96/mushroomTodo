import conf from "../conf/conf";

import { Client, Account, ID, Teams ,Query  } from "appwrite";

export class TeamService{
    client=new Client();
    teams;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId);
        this.teams=new Teams(this.client)
    }
    async createTeam(teamname){
        try {
            return await this.teams.create(ID.unique(),teamname);
        } catch (error) {
            console.log("error in createTeam",error);
        }
    }
    async getTeams(){
        try {
            return await this.teams.list();
        } catch (error) {
            console.log("error in getTeams",error);
        }
    }
    async getTeam(teamId){
        try {
            return await this.teams.get(teamId);
        } catch (error) {
            console.log("error in getTeam",error);
        }
    }
    async updateTeam(teamId,name){
        try {
            return await this.teams.updateName(teamId,name);
        } catch (error) {
            console.log("error in updateTeam",error);
        }
    }
    async deleteTeam(teamId){
        try {
            return await this.teams.delete(teamId);
        } catch (error) {
            console.log("error in deleteTeam",error);
        }
    }
    async getMembers(teamId){
        try {
            return await this.teams.listMemberships(teamId);
        } catch (error) {
            console.log("error in getMembers",error);
        }
    }
    async addMember(teamId,roles=["member"],userId,email){
        try {
            var url="https://mushroom-todo.vercel.app/"
            var phone="+919876543210"
            return await this.teams.createMembership(teamId,roles,email,undefined,undefined,url);
        } catch (error) {
            console.log("error in addMember",error);
        }
    }
    async acceptInvitation(teamId,membershipId,userId,secret){
        try {
            return await this.teams.updateMembershipStatus(teamId,membershipId,userId,secret);
        } catch (error) {
            throw error;
        }

    }

}

const teamService=new TeamService();
export default teamService;