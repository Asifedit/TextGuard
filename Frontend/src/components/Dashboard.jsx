import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ViewItem from "./ViewItem";

const Dashboard = () => {
    const [topic, setTopic] = useState("");
    const [data, setData] = useState("");
    const [savedData, setSavedData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const token = localStorage.getItem("token");
    const SERVERurl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (token) {
            fetchData();
        } else {
            return false;
        }
    }, [savedData]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${SERVERurl}/getData`, {
                params: { token },
            });
            setSavedData(response.data.savedData);
        } catch (error) {
            console.error("Error fetching data", error);
            toast.error("Check your network");
        }
    };

    const handleSave = async () => {
        try {
            const response = await axios.post(`${SERVERurl}/saveData`, {
                token,
                topic,
                data,
            });
            setSavedData((prevData) => [...prevData, response.data.savedData]);
            setTopic("");
            setData("");
            toast.success("Data saved successfully");
        } catch (error) {
            console.error("Error saving data", error);
            toast.error("Sorry, we couldn't save");
        }
    };

    const handleDelete = async (itemId) => {
        try {
            if (confirm("Do you want to delete this item?")) {
                const response = await axios.delete(
                    `${SERVERurl}/deleteData/${itemId}`,
                    {
                        data: { token },
                    }
                );
                setSavedData(response.data.savedData);
                setSelectedItem(null);
                toast.success("Data deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting data", error);
            toast.error("Error deleting data");
        }
    };

    const view = (item) => {
        setSelectedItem(item);
    };

    const closeView = () => {
        setSelectedItem(null);
    };

    const handleUpdate = (updatedItem) => {
        setSavedData((prevData) =>
            prevData.map((item) =>
                item._id === updatedItem._id ? updatedItem : item
            )
        );
    };

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Successfully copied");
        } catch (err) {
            console.error("Failed to copy: ", err);
            toast.error("Failed to copy");
        }
    };

    const handlePaste = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setTopic(clipboardText);
        } catch (error) {
            console.error("Failed to read clipboard contents: ", error);
        }
    };
    const handlePaste2 = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setData(clipboardText);
        } catch (error) {
            console.error("Failed to read clipboard contents: ", error);
        }
    };
    return (
        <div className="flex flex-col pt-14 justify-center w-full overflow-auto h-full items-center gap-3">
            <h2 className="text-5xl pt-3 text-lime-500">
                {document.cookie}
                <span className="text-blue">&lt;</span>Dashboard
                <span className="text-blue">/&gt;</span>
            </h2>
            <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-center">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Topic"
                        className="myShadwo2 rounded-md px-2 py-2 placeholder:text-blue"
                        required
                    />
                    <i
                        onClick={handlePaste}
                        className="fa-regular fa-paste text-xl font h-11 rounded-full w-16 btnclick"
                    ></i>
                </div>
                <div className="flex gap-4 items-center ">
                    <input
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        placeholder="Your data"
                        className="myShadwo2 rounded-md px-2 py-2 placeholder:text-blue resize"
                        required
                    />
                    <i
                        onClick={handlePaste2}
                        className="fa-regular fa-paste  text-xl  h-11 rounded-full w-16 btnclick"
                    ></i>
                </div>
            </div>
            <button
                onClick={handleSave}
                className="btnclick w-24 rounded-lg m-5"
            >
                Save
            </button>
            <div className="px-2 w-full">
                <h3 className="px-4 w-full">Your data</h3>
                <div>
                    <div className="flex bg-lime-600 text-white font-bold">
                        <div className="w-[45%] p-1">Topic</div>
                        <div className="w-[45%] p-2">Data</div>
                        <div className="w-[10%] p-2 text-center">Tool</div>
                    </div>
                    <div className="divide-y-2 bg-lime-200">
                        {savedData.map((item) => (
                            <div
                                key={item._id}
                                className="flex border-b text-blue divide-x-2"
                            >
                                <div className="w-[45%] p-2 flex items-center justify-between">
                                    <p className="w-[95%] overflow-hidden overflow-ellipsis whitespace-nowrap">
                                        {item.topic}
                                    </p>
                                    <i
                                        className="fa-solid fa-copy cursor-pointer w-[5%]"
                                        onClick={() =>
                                            handleCopy(`${item.topic}`)
                                        }
                                    ></i>
                                </div>
                                <div className="w-[45%] p-2 flex items-center">
                                    <p className="w-[95%] overflow-hidden overflow-ellipsis whitespace-nowrap">
                                        {item.data}
                                    </p>
                                    <i
                                        className="fa-solid fa-copy cursor-pointer w-[5%]"
                                        onClick={() =>
                                            handleCopy(`${item.data}`)
                                        }
                                    ></i>
                                </div>
                                <div className="w-[10%] p-2 text-center flex items-center justify-center">
                                    <i
                                        className="fa-solid fa-trash cursor-pointer mx-1"
                                        onClick={() => handleDelete(item._id)}
                                    ></i>
                                    <i
                                        className="fa-solid fa-eye cursor-pointer mx-1"
                                        onClick={() => view(item)}
                                    ></i>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full relative  h-20 align-bottom mx-auto flex justify-center text-center item pt-7 font-U text-[11px]">
                        <i className="fa-solid fa-triangle-exclamation text-yellow-600 pt-1 text-[10px] text-center"></i>
                        <p className="pt-[2px]">
                            Your data is safe but won't be stored forever. This
                            is a test project. Avoid saving sensitive info.
                        </p>
                    </div>
                </div>
            </div>
            {selectedItem && (
                <ViewItem
                    item={selectedItem}
                    onClose={closeView}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default Dashboard;
