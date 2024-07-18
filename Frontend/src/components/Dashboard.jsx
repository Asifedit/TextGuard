// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Dashboard = () => {
    const [topic, setTopic] = useState("");
    const [data, setData] = useState("");
    const [savedData, setSavedData] = useState([]);
    const token = localStorage.getItem("token");

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

    return (
        <div>
            <h2>Dashboard</h2>
            <div>
                <label>Topic:</label>
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
            </div>
            <div>
                <label>Data:</label>
                <input
                    type="text"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
            </div>
            <button onClick={handleSave}>Save</button>
            <h3>Saved Data:</h3>
            <ul>
                {savedData.map((item, index) => (
                    <li key={index}>
                        <strong>{item.topic}</strong>: {item.data}
                        <button onClick={() => handleDelete(item._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
