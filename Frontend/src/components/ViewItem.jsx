import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ViewItem = ({ item, onClose, onUpdate }) => {
    const [editMode, setEditMode] = useState(false);
    const [topic, setTopic] = useState(item.topic);
    const [data, setData] = useState(item.data);
    const [canResize, setCanResize] = useState(false);
    const textAreaRef = useRef(null);
    const SERVERurl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const checkScrollbar = () => {
            if (textAreaRef.current) {
                const hasVerticalScrollbar =
                    textAreaRef.current.scrollHeight >
                    textAreaRef.current.clientHeight;
                setCanResize(hasVerticalScrollbar);
            }
        };

        checkScrollbar();
        // Check again when `data` changes
    }, [data]);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token is missing. Please log in again.");
            }

            const response = await axios.put(
                `${SERVERurl}/updateData/${item._id}`,
                { topic, data },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updatedItem = { ...item, topic, data };
            onUpdate(updatedItem);
            toast.success("Data updated successfully");
            setEditMode(false);
            onClose();
        } catch (error) {
            console.error("Error updating data", error);
            toast.error("Failed to update data");
        }
    };

    const back = () => {
        setEditMode(false);
    };

    return (
        <div className="absolute top-0 h-screen flex items-center justify-center backdrop-blur-[2px] w-screen z-10">
            <div className="view p-4 flex flex-col border border-gray-400 rounded-lg shadow-md w-5/6 bg-lime-200">
                <button onClick={onClose} className="w-full right-1 relative">
                    <i className="fa-solid fa-xmark text-2xl  right-1 absolute "></i>
                </button>
                <h3 className="text-4xl font-semibold mb-2 text-lime-700 m-auto">
                    Details
                </h3>
                {editMode ? (
                    <div className="flex flex-col gap-2">
                        <p>TOPIC</p>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="Topic"
                            className="myShadwo2 px-2 py-2 placeholder:text-blue"
                        />
                        <p>DATA</p>
                        <textarea
                            ref={textAreaRef}
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            placeholder="Data"
                            className={`myShadwo2 px-2 py-2 placeholder:text-blue ${
                                canResize ? "resize-y" : "resize-none"
                            }`}
                        />
                        <div className="flex items-center justify-around">
                            <i
                                onClick={back}
                                className="text-3xl fa-solid fa-backward fa-beat-fade p-5"
                            ></i>
                            <i
                                onClick={handleSave}
                                className="fa-solid text-3xl fa-floppy-disk fa-bounce p-5 pt-10"
                            ></i>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col text-lime-500 font-U">
                        <p className="break-words px-3 py-6 text-lime-700">
                            <strong className=" text-blue">Topic:</strong>{" "}
                            {item.topic}
                        </p>
                        <p className="break-words px-3 py-6 text-lime-700">
                            <strong className="text-blue">
                                Data:
                            </strong>{" "}
                            {item.data}
                        </p>
                        <i
                            onClick={() => setEditMode(true)}
                            className="text-2xl align-middle m-auto fa-solid fa-pen-to-square fa-shake text-lime-600"
                        ></i>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewItem;
