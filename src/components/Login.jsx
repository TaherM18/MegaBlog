import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth.service";
import { login as loginSlice } from "../store/auth.slice";
import { Input, Button, Logo } from "../components";
import { Alert, alertType } from "./Alert";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    async function submitHandler(data) {
        console.log("submitHandler data:",data)
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = authService.getCurrentUser();
                if (userData) {
                    dispatch(loginSlice(userData));
                    navigate("/");
                } else {
                    setError("Failed to set login state");
                }
            } else {
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <Logo />
                </div>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>

                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(submitHandler)}
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
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            required=""
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            for="remember"
                                            className="text-gray-500 dark:text-gray-300"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <Link
                                    to="reset-password"
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Button>
                                Sign In
                            </Button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Dont have an account yet?
                                <Link
                                    to="/signup"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>

                    </div>
                </div>

                {error && <Alert type={alertType.danger} message={error} />}

            </div>
        </section>
    );
}
