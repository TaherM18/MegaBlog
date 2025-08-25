import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../components";
import { Alert, alertType } from "./Alert";
import { useDispatch } from "react-redux";
import { login as loginSlice } from "../store/auth.slice";
import authService from "../appwrite/auth.service";

export default function Register() {
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function submitHandler(data) {
        console.log("register submitHandler data:",data)
        setError("");
        const userData = await authService.createAccount(data);
        if (userData) {
            dispatch(loginSlice(userData));
            navigate("/");
        }
        else {
            setError("Failed to create account");
        }
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(submitHandler)} 
                class="max-w-sm mx-auto"
            >
                <Input
                    label="Email"
                    placeholder="name@company.com"
                    type="email"
                    {...register(
                        "email",
                        {
                            required: true,
                            validate: {
                                matchPattern: (value) => {
                                    const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)*(\.\w{2,5}){1}$/;
                                    return regex.test(value) || "Email address must be a valid email"
                                }
                            }
                        }
                    )}
                />
                <Input
                    label="Password"
                    placeholder="********"
                    type="password"
                    {...register(
                        "password",
                        {
                            required: true,
                        }
                    )}
                />
                <Button >Submit</Button>
            </form>
    
            {error && <Alert type={alertType.danger} message={error} />}
        </div>
    );
}
