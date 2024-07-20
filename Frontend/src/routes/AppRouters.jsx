// src/Routes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Home from "../components/Home";

const AppRoot = ({ token, setToken }) => (
    <Routes>
        <Route path="/register" element={<Register setToken={setToken}/>} />

        <Route path="/login" element={ <Login setToken={setToken} />} />

        <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Home />} />
    </Routes>
);

export default AppRoot;
