import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const Dashboard = () => {
    const [topic, setTopic] = useState("");
    const [data, setData] = useState("");
    const [savedData, setSavedData] = useState([]);
    const token = localStorage.getItem("token");

const handleCopy = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        toast.success("Successfully Copy");
    } catch (err) {
        console.error("Failed to copy: ", err);
        toast.error("Successfully Copy");
    }
    };
    
    // Fetch saved data on component mount
    useEffect(() => {
        fetchData();
    }, [token]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/users/getData",
                {
                    params: { token },
                }
            );
            setSavedData(response.data.savedData);
        } catch (error) {
           
            console.error("Error fetching data", error);
             toast.error("chack your network");
        }
    };

    const handleSave = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/users/saveData",
                { token, topic, data }
            );
            setSavedData(response.data.savedData);
            setTopic("");
            setData("");
        } catch (error) {
            console.error("Error saving data", error);
            toast.error("Sorry We can't saved");
        }
    };

    const handleDelete = async (itemId) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/users/deleteData/${itemId}`,
                {
                    data: { token },
                }
            );
            setSavedData(response.data.savedData);
        } catch (error) {
            console.error("Error deleting data", error);
        }
    };

    const handleResize = (event) => {
        const cell = event.target;
        cell.style.height = "auto";
        cell.style.height = `${Math.min(
            Math.max(cell.scrollHeight, 20),
            100
        )}px`;
    };

    return (
        <div className="flex flex-col pt-14 justify-center w-full h-full items-center gap-3">
            <h2 className="text-5xl pt-3 text-lime-500">
                <span className="text-blue">&lt;</span>Dashboard
                <span className="text-blue">/&gt;</span>
            </h2>
            <div className="gap-2 flex flex-col gap-6">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Topic"
                    className="myShadwo2 px-2 py-2 placeholder:text-blue"
                />
                <input
                    type="text"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    placeholder="Your data"
                    className="myShadwo2 px-2 py-2 placeholder:text-blue"
                />
            </div>
            <button onClick={handleSave} className="myShadwo px-5 py-2 m-5">
                Save
            </button>
            <h3 className="px-4 w-full">Your data</h3>
            <table className="w-full table-fixed border-collapse">
                <thead>
                    <tr>
                        <th className="w-2/5 text-left bg-gray-200 p-2">
                            Topic
                        </th>
                        <th className="w-2/5 text-left bg-gray-200 p-2">
                            Data
                        </th>
                        <th className="w-1/5 text-left bg-gray-200 p-2">
                            Tool
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {savedData.map((item, index) => (
                        <tr key={index} className="border-b">
                            <td
                                className="p-2  bg-lime-200 overflow-hidden overflow-ellipsis whitespace-nowrap"
                                style={{ height: "20px", maxHeight: "40px" }}
                                onInput={handleResize}
                            >
                                {item.topic}
                                <div>
                                    {" "}
                                    <i
                                        className="fa-solid fa-copy cursor-pointer"
                                        onClick={() =>
                                            handleCopy(`${item.topic}`)
                                        }
                                    ></i>
                                </div>
                            </td>
                            <td
                                className="p-2 bg-lime-200 overflow-hidden overflow-ellipsis whitespace-nowrap  "
                                style={{ height: "20px", maxHeight: "40px" }}
                                onInput={handleResize}
                            >
                                {item.data}
                            </td>
                            <td className="p-2 bg-lime-200 text-center">
                                <i
                                    className="fa-solid fa-trash cursor-pointer"
                                    onClick={() => handleDelete(item._id)}
                                ></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
