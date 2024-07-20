import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:5000/api/users/login`,
                { username, password }
            );
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
        <div className="flex relative w-screen h-screen justify-center items-center">
            <div className="myShadwo2 p-11 rounded-md">
                <h2 className="text-3xl md:w-96 w-2/3 text-lime-500 uppercase font-U">
                    Login
                </h2>
                <form onSubmit={handleSubmit} className="md:w-96 w-2/3 grid">
                    <div className="Flex">
                        <label>Username:</label>
                        <input
                            type="text"
                            className="h-8 rounded myShadwo2 px-3"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="Flex">
                        <label>Password:</label>
                        <input
                            type={showPassword ? "password" : "text"}
                            className="h-8 rounded myShadwo2 px-3"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {password.length > 0 && (
                            <i
                                className={`fas pt-6 text-blue ${
                                    showPassword ? "fa-eye-slash" : "fa-eye"
                                } absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer`}
                                onClick={toggleShowPassword}
                            ></i>
                        )}
                    </div>
                    <p className="text-sm">
                        Don't have an account?{" "}
                        <Link className="text-blue" to="/register">
                            Register
                        </Link>
                    </p>
                    <button
                        type="submit"
                        className="text-center bg-lime-600 m-auto px-7 py-2 mt-10 myShadwo"
                    >
                        Login
                    </button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Login;
