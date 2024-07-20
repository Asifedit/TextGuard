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

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Successfully Copied");
        } catch (err) {
            console.error("Failed to copy: ", err);
            toast.error("Failed to Copy");
        }
    };

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
            toast.error("Check your network");
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
            toast.error("Sorry, we couldn't save");
        }
    };

    const handleDelete = async (itemId) => {
        console.log(itemId);
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/users/deleteData/${itemId}`,
                {
                    data: { token },
                }
            );
            setSavedData(response.data.savedData);
            setSelectedItem(null); // Clear selected item on delete
        } catch (error) {
            console.error("Error deleting data", error);
        }
    };

    const view = (item) => {
        setSelectedItem(item); // Set the selected item
    };

    const closeView = () => {
        setSelectedItem(null); // Clear the selected item
    };

    
 const handleUpdate = (updatedItem) => {
     setSavedData((prevData) =>
         prevData.map((item) =>
             item._id === updatedItem._id ? updatedItem : item
         )
     );
 };
 return (
     <div className="flex flex-col pt-14 justify-center w-full h-full items-center gap-3">
         <h2 className="text-5xl pt-3 text-lime-500">
             <span className="text-blue">&lt;</span>Dashboard
             <span className="text-blue">/&gt;</span>
         </h2>
         <div className="flex flex-col gap-6">
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
         <div className="px-2 w-full">
             <h3 className="px-4 w-full">Your data</h3>
             <table className="w-full table-fixed">
                 <thead>
                     <tr className="bg-lime-700">
                         <th className="w-[45%] text-left p-1">Topic</th>
                         <th className="w-[45%] text-left p-2">Data</th>
                         <th className="w-[10%] text-left p-2">Tool</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y-2 bg-lime-400">
                     {savedData.map((item) => (
                         <tr
                             key={item._id}
                             className="border-b text-blue divide-x-2"
                         >
                             <td className="p-2 items-center flex justify-between">
                                 <p className="w-[95%] overflow-hidden overflow-ellipsis whitespace-nowrap">
                                     {item.topic}
                                 </p>
                                 <i
                                     className="fa-solid fa-copy cursor-pointer w-[5%]"
                                     onClick={() => handleCopy(`${item.topic}`)}
                                 ></i>
                             </td>
                             <td className="p-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                 <p>{item.data}</p>
                             </td>
                             <td className="p-2 text-center flex items-center justify-around">
                                 <i
                                     className="fa-solid fa-trash cursor-pointer "
                                     onClick={() => handleDelete(item._id)}
                                 ></i>
                                 <i
                                     className="fa-solid fa-eye cursor-pointer"
                                     onClick={() => view(item)}
                                 ></i>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
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
