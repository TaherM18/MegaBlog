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
        <form
            className="flex flex-wrap"
            onSubmit={handleSubmit(submitHandler)}
        >
            <div className="w-1/3 px-2">
                <Input
                    label="Title"
                    placeholder="Enter title"
                    {...register(
                        "title", {
                            required: true,
                        }
                    )}
                />
                <Input
                    label="Slug"
                    placeholder="Slug"
                    {...register(
                        "slug", {
                            required: true,
                        }
                    )}
                    onInput={(e) => {
                        setValue(
                            "slug",
                            slugTransform(e.target.value), {
                                shouldValidate: true,
                            }
                        );
                    }}
                />
                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register(
                        "featuredImage", {
                            required: !post,
                        }
                    )}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={storageService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                />
                {...register(
                    "status", {
                        required: true,
                    }
                )}
                <Button>
                    {post ? "Update" : "Create"}
                </Button>
            </div>
        </form>
    );
}
