import conf from "../conf/conf";

import { Client, Account, ID, Databases ,Storage,Query } from "appwrite";

export class Service{
    client=new Client();
    databases


    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client)
    }
    
    async createTodo({title,content,status,userId}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,ID.unique(),{
                title,
                content,
                status,
                userId,
            });
        } catch (error) {
            console.log(error);
        }
    }
    async updateTodo(slug,{title,content,status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                title,
                content,
                status,
            });
        } catch (error) {
            console.log(error);
        }
    }
    async deleteTodo(slug){
        try {
             await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
             return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getTodo(slug){
        try {
           return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);

        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getTodos(userId) {
        const queries = [Query.equal("userId", userId)]; // Assuming the field name in the database is "userId"
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async shareTodoWithTeam(todoId,teamId){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,todoId,{
                teamId,
            });
        } catch (error) {
            console.log(error);
        }
    }
    async getSharedTodosForTeam(teamId){
        const queries = [Query.equal("teamId", teamId)]; // Assuming the field name in the database is "userId"
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}



const service=new Service();
export default service


