import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setToken }) => {
    const SERVERurl = import.meta.env.VITE_API_URL;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${SERVERurl}/login`, {
                username,
                password,
            });
alert("API URL:", SERVERurl)
            if (response.data) {
                setMessage(response.data.message);
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            } else {
                setMessage("Unexpected response from server.");
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "An error occurred. Please try again.";
            setMessage(errorMessage);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setShowPassword(e.target.value.length > 0);
    };

    return (
        <div className="flex min-h-screen justify-center items-center bg-gray-100">
            <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md mx-4 divshadwo">
                <h2 className="text-3xl text-center text-lime-500 uppercase font-bold mb-6">
                    Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium text-gray-700">
                            Username:
                        </label>
                        <input
                            type="text"
                            className="h-10 rounded myShadwo2  border px-3 "
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col relative table-desing">
                        <label className="mb-2 text-sm font-medium text-gray-700">
                            Password:
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="h-10 rounded border px-3   myShadwo2 "
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        {password.length > 0 && (
                            <i
                                className={`fas text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                                    showPassword ? "fa-eye-slash" : "fa-eye"
                                }`}
                                onClick={toggleShowPassword}
                            ></i>
                        )}
                    </div>
                    <p className="text-sm text-center">
                        Don't have an account?{" "}
                        <Link
                            className="text-blue hover:underline"
                            to="/register"
                        >
                            Register
                        </Link>
                    </p>
                    <button
                        type="submit"
                        className="w-20 m-auto py-2 bg-lime-600 text-white rounded hover:bg-lime-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                {message && (
                    <p className="mt-4 text-center text-red-600">{message}</p>
                )}
            </div>
        </div>
    );
};

export default Login;
