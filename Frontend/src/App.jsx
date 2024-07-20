import React, { useState, useEffect } from "react";
import AppRoot from "./routes/AppRouters";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Toaster, ToastBar } from "react-hot-toast";
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
            <Nav token={token} setToken={setToken} />
            <AppRoot token={token} setToken={setToken} />
            <Footer />
            <Toaster
                position="top-left"
                reverseOrder={false}
                containerStyle={{
                    top: 55,
                    left: 5,
                }}
            >
                {(t) => (
                    <ToastBar
                        toast={t}
                        style={{
                            animation: t.visible
                                ? "custom-enter .3s ease-in"
                                : "custom-exit .3s ease",
                        }}
                    />
                )}
            </Toaster>
        </div>
    );
};

export default App;
