import config from "../config";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client;
    account;

    constructor() {
        this.client = new Client()
                        .setEndpoint(config.appwrite_endpoint)
                        .setProject(config.appwrite_project_id);
        this.account = new Account(this.client);
    };

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                this.login({email, password});
            }
            else {
                return userAccount
            }
        }
        catch (error) {
            console.error("ERROR: auth.service :: createAccount ::\n",error);
            return null;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch (error) {
            console.error("ERROR: auth.service :: login ::\n",error);
            return null;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        }
        catch (error) {
            console.error("ERROR: auth.service :: getCurrentUser ::\n",error);
            return null;
        }
    }

    async logoutAll() {
        try {
            return await account.deleteSessions();
        }
        catch (error) {
            console.error("ERROR: auth.service :: logoutAll ::\n",error);
            return null;
        }
    }
}

const authService = new AuthService();

export default authService;