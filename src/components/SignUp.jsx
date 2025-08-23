import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createAccount, login as loginSlice } from "../store/auth.slice";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Logo } from "../components";
import { Alert, alertType } from "./Alert";
import authService from "../appwrite/auth.service";

export default function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState();

    async function submitHandler(data) {
        try {
            const user = await createAccount(data);
            if (user) {
                const userData = await authService.getCurrentUser();
                dispatch(loginSlice(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Logo />
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>

                        <form 
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(submitHandler)}
                        >
                            <Input
                                label="Name"
                                placeholder="Enter your name"
                                {...register(
                                    "name", {
                                        required: true,
                                    }
                                )}
                            />
                            <Input
                                label="Email"
                                placeholder="name@company.com"
                                type="email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) => {
                                            const regex =
                                                /^\w+([.-]?\w+)@\w+([.-]?\w+)*(\.\w{2,5}){1}$/;
                                            return (
                                                regex.test(value) ||
                                                "Email address must be a valid email"
                                            );
                                        },
                                    },
                                })}
                            />
                            <Input
                                label="Password"
                                placeholder="********"
                                type="password"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                            <Input
                                label="Confirm Password"
                                type="password"
                                {...register("confirm", {
                                    required: true,
                                })}
                            />

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required=""
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        for="terms"
                                        className="font-light text-gray-500 dark:text-gray-300"
                                    >
                                        I accept the{" "}
                                        <Link
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            to="#"
                                        >
                                            Terms and Conditions
                                        </Link>
                                    </label>
                                </div>
                            </div>
                            <Button>Create an Account</Button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?
                                <Link
                                    to="/login"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Login here
                                </Link>
                            </p>
                        </form>

                    </div>
                </div>

                {error && <Alert type={alertType.danger} message={error.message} />}

            </div>
        </section>
    );
}
