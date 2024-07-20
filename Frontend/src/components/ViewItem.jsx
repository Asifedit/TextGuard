// ViewItem.js
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ViewItem = ({ item, onClose, onUpdate }) => {
    const [editMode, setEditMode] = useState(false);
    const [topic, setTopic] = useState(item.topic);
    const [data, setData] = useState(item.data);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:5000/api/users/updateData/${item._id}`,
                { topic, data },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const updatedItem = { ...item, topic, data }; // Create updated item
            onUpdate(updatedItem); // Call onUpdate with the updated item
            toast.success("Data updated successfully");
            setEditMode(false);
            onClose(); // Close the view after saving
        } catch (error) {
            console.error("Error updating data", error);
            toast.error("Failed to update data");
        }
    };


    const back = () => {
        setEditMode(false)
    }
    return (
        <div className="absolute top-0 h-screen flex items-center justify-center backdrop-blur-[2px] w-screen">
            <div className="view p-4 border border-gray-400 rounded-lg shadow-md w-5/6 bg-lime-400">
                <button
                    onClick={onClose}
                    className="w-full right-1"
                >
                    <i className="fa-solid fa-xmark text-2xl text-left"></i>
                </button>
                <h3 className="text-xl font-semibold mb-2">Details</h3>
                {editMode ? (
                    <div className="flex flex-col gap-2">
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
                            placeholder="Data"
                            className="myShadwo2 px-2 py-2 placeholder:text-blue"
                        />
                        <div>
                            <button
                                onClick={handleSave}
                                className="myShadwo px-5 py-2 m-5"
                            >
                                Save
                            </button>
                            <button
                                onClick={back}
                                className="myShadwo px-5 py-2 m-5"
                            >
                                back
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="break-words">
                            <strong>Topic:</strong> {item.topic}
                        </p>
                        <p className="break-words">
                            <strong>Data:</strong> {item.data}
                        </p>
                        <button
                            onClick={() => setEditMode(true)}
                            className="myShadwo px-5 py-2 m-5"
                        >
                            Edit
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ViewItem;
