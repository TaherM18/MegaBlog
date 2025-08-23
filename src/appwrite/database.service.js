import config, { articleStatus } from "../config";
import { Client, Databases, Query } from "appwrite";

class DatabaseService {
    client;
    databases;

    constructor() {
        this.client = new Client()
                    .setEndpoint(config.appwrite_endpoint)
                    .setProject(config.appwrite_project_id);
        this.databases = new Databases(this.client);
    }

    //#region createPost
    async createPost({ title, content, featuredImage, status, userId, docId }) {
        try {
            return await this.databases.createDocument(
                config.appwrite_database_id,
                config.appwrite_article_collection_id,
                docId,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        }
        catch (error) {
            console.error("ERROR: database.service :: createPost ::\n",error);
            return null;
        }
    }

    //#region updatePost
    async updatePost(docId, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwrite_database_id,
                config.appwrite_article_collection_id,
                docId,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        }
        catch (error) {
            console.error("ERROR: database.service :: updatePost ::\n",error);
            return null;
        }
    }

    //#region deletePost
    async deletePost(docId) {
        try {
            await this.databases.deleteDocument(
                config.appwrite_database_id,
                config.appwrite_article_collection_id,
                docId,
            );
            return true;
        }
        catch (error) {
            console.error("ERROR: database.service :: deletePost ::\n",error);
            return false;
        }
    }

    //#region getPost
    async getPost(docId) {
        try {
            return await this.databases.getDocument(
                config.appwrite_database_id,
                config.appwrite_article_collection_id,
                docId,
            );
        }
        catch (error) {
            console.error("ERROR: database.service :: getPost ::\n",error);
            return null;
        }
    }

    //#region getAllPost
    async getAllPosts(queries = [ Query.equal("status", articleStatus.active) ]) {
        try {
            return await this.databases.listDocuments(
                config.appwrite_database_id,
                config.appwrite_article_collection_id,
                queries,
            );
        }
        catch (error) {
            console.error("ERROR: database.service :: getAllPosts ::\n",error);
            return null;
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;