const config = {
    appwrite_project_id: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwrite_database_id: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwrite_collection_id: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwrite_bucket_id: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwrite_endpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
};


export default config;