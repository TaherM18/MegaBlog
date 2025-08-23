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

    //#region createAccount
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return await this.login({email, password});
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error("ERROR: auth.service :: createAccount ::\n",error);
            return null;
        }
    }

    //#region login
    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch (error) {
            console.error("ERROR: auth.service :: login ::\n",error);
            return null;
        }
    }

    //#region getCurrentUser
    async getCurrentUser() {
        try {
            return await this.account.get();
        }
        catch (error) {
            console.error("ERROR: auth.service :: getCurrentUser ::\n",error);
            return null;
        }
    }

    //#region logoutAll
    async logoutAll() {
        try {
            return await this.account.deleteSessions();
        }
        catch (error) {
            console.error("ERROR: auth.service :: logoutAll ::\n",error);
            return null;
        }
    }
}

const authService = new AuthService();

export default authService;