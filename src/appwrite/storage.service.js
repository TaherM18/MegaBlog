import config from "../config";
import { Client, Storage, ID } from "appwrite";

class StorageService {
    client;
    storage;

    constructor() {
        this.client = new Client()
                    .setEndpoint(config.appwrite_endpoint)
                    .setProject(config.appwrite_project_id);
        this.storage = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwrite_bucket_id,
                ID.unique(),
                file,
            );
        }
        catch (error) {
            console.error("ERROR: storage.service :: uploadFile ::\n",error);
            return null;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.appwrite_bucket_id,
                fileId,
            );
            return true;
        }
        catch (error) {
            console.error("ERROR: storage.service :: deleteFile ::\n",error);
            return false;
        }
    }

    async getFilePreview(fileId) {
        try {
            return await this.storage.getFilePreview(
                config.appwrite_bucket_id,
                fileId,
            );
        }
        catch (error) {
            console.error("ERROR: storage.service :: getFilePreview ::\n",error);
            return null;
        }
    }
}

const databaseService = new StorageService();

export default databaseService;