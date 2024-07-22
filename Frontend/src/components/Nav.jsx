import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const [valu, setvalu] = useState("LOGIN");
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            setvalu("LOGOUT");
        }
    },);

    const handeltoken = () => {
        if (token) {
            localStorage.clear("token");
            setToken(null);
            navigate("/login");
            console.log(token);
            setvalu("LOGIN");
        }
    };
    return (
        <div className="relative z-20">
            <nav className="flex fixed w-screen gap-4 items-center justify-between mb-3 px-6 py-1 bg-lime-300 text-blue shadow-slate-700 shadow-[0px_0px_10px]">
                <div>
                    <Link to={"/"} className="font-R text-[30px] font-2xl font-U">
                        TextGuard
                    </Link>
                    {console.log(localStorage.getItem("token"))}
                </div>
                <div className="flex gap-3 font-R font-thin">
                    <div className="font-bold text-xl">
                        <i className="fa-brands fa-github font-bold pr-1"></i>
                        GITHUB
                    </div>
                    <Link
                        onClick={handeltoken}
                        className="font-bold text-xl"
                        to={"/login"}
                    >
                        {valu}
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
