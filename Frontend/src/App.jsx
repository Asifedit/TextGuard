import React, { useState, useEffect } from "react";
import AppRoot from "./routes/AppRouters";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <div>
            <Nav />
            <AppRoot token={token} setToken={setToken} />
            <Footer />
        </div>
    );
};

export default App;
