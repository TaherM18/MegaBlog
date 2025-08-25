import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import storageService from "../appwrite/storage.service";
import databaseService from "../appwrite/database.service";
import { Input, Select, Button, RTE } from "../components";

export default function PostForm({ post = null }) {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });

    const userData = useSelector((state) => (state.userData));
    const navigate = useNavigate();

    const slugTransform = useCallback((value) => {
        const spaceRegex = /\s/g;
        const characterRegex = /\W/g;
        return value.trim().toLowerCase().replace(spaceRegex, "-").replace(characterRegex, "");
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name == "title") {
                setValue("slug", slugTransform(value.title, { shouldValidate: true }))
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, setValue, slugTransform]);

    async function submitHandler(data) {
        const file = data.image[0] 
                        ? await storageService.uploadFile(data.image[0])
                        : null;
        if (post) {     // update existing post data
            if (file) {
                await storageService.deleteFile(post.featuredImage)
            }
            const dbPost = await databaseService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
            });
            
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
        else {      // create new post
            const dbPost = await databaseService.createPost({
                ...data,
                featuredImage: file?.$id,
                userId: userData.userId,
            });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    }

    return (
        <div>PostForm</div>
    );
}
