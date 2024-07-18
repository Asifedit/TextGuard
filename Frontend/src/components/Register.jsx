import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Register = ({ setToken }) => {

const notify = () => {
    toast("This is a success message!", {
        position: "bottom-left",
        style: {
            background: "#28a745",
            color: "#fff",
            animation:"bounceIn 2s ",

        },
    });
};

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/users/register",
                { username, password }
            );
            setMessage(response.data.message);
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="flex w-screen h-screen items-center justify-center">
            <div className=" myShadwo2 p-10 rounded-md">
                <h2 className="text-3xl text-lime-600 font-U">Register</h2>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center "
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
                        Alrady Account Created ?{" "}
                        <Link className="text-blue" to={"/login"}>
                            Login
                        </Link>{" "}
                    </p>
                    <button
                        onClick={notify}
                        className="px-7 py-2 mt-5 myShadwo rounded-md"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
                {message && <p>{message}</p>}
            </div>
            <Toaster />
        </div>
    );
};

export default Register;
