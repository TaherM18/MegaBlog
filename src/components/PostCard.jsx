import React from "react";
import { Link } from "react-router-dom";
import storageService from "../appwrite/storage.service";

function PostCard({ $id, title, content, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <img
                    className="rounded-t-lg"
                    src={storageService.getFilePreview(featuredImage)}
                    alt="featured-image"
                />
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {title}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {content}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
