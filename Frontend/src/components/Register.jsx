import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const registrationToast = toast.loading("Registering...");

        try {
            const response = await axios.post(
                "http://localhost:5000/api/users/register",
                { username, password, Email }
            );
            toast.success("Registration successful!");
            setMessage(response.data.message);
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
            setMessage(error.response?.data?.message || "Registration failed");
        } finally {
            toast.dismiss(registrationToast);
        }
    };

    return (
        <div className="flex w-screen h-[110vh] items-center relative justify-center">
            <div className="myShadwo2 p-10 rounded-md">
                <h2 className="text-3xl text-lime-600 font-U">Register</h2>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center"
                >
                    <div className="Flex">
                        <label>Username:</label>
                        <input
                            className="myShadwo2 px-3 py-1 rounded-lg my-2"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="Flex">
                        <label>Email:</label>
                        <input
                            className="myShadwo2 px-3 py-1 rounded-lg my-2"
                            type="text"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="Flex">
                        <label>Password:</label>
                        <input
                            className="myShadwo2 px-3 py-1 rounded-lg my-2"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <p className="text-xs w-full pl-1">
                        Already have an account?{" "}
                        <Link className="text-blue" to={"/login"}>
                            Login
                        </Link>
                    </p>
                    <button
                        className="px-7 py-2 mt-5 myShadwo rounded-md"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
            </div>

        </div>
    );
};

export default Register;
