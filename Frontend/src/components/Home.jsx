import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {

    return (
        <div className>
            <section className="bg-blue-500 py-20 text-">
                <div className="container mx-auto text-center">
                    <i className="fas fa-database text-6xl mx-auto mb-6"></i>
                    <h1 className="text-5xl font-bold mb-5 font-U text-[29px]">
                        Store Your Secrets Securely
                    </h1>
                    <p className="text-lg mb-8">
                        SecureTextVault helps you store passwords, secret API
                        keys, and more safely and access them over the net.
                    </p>
                    <Link
                        to={"/register"}
                        className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-lg myShadwo "
                    >
                        Get Started
                    </Link>
                </div>
            </section>
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold">Features</h2>
                        <p className="text-gray-600 mt-4">
                            Discover what makes SecureTextVault the best choice
                            for your secure storage needs.
                        </p>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/3 p-6">
                            <div className="rounded-lg shadow-lg p-6 text-center myShadwo2">
                                <i className="fas fa-solid fa-user-shield text-3xl text-blue-500 mx-auto mb-4"></i>
                                <h3 className="text-2xl font-bold mb-4">
                                    Secure Storage
                                </h3>
                                <p className="text-gray-600">
                                    Your data is encrypted and stored securely,
                                    ensuring that only you have access to it.
                                </p>
                            </div>
                        </div>
                        <div className="asif w-full md:w-1/3 p-6">
                            <div className="rounded-lg shadow-lg p-6 text-center myShadwo2">
                                <i className="fas fa-globe-americas text-3xl text-blue-500 mx-auto mb-4"></i>
                                <h3 className="text-2xl font-bold mb-4">
                                    Easy Access
                                </h3>
                                <p className="text-gray-600">
                                    Access your stored information from anywhere
                                    with our secure online platform.
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 p-6">
                            <div className="myShadwo2 rounded-lg shadow-lg p-6 text-center">
                                <i className="fas fa-face-smile text-3xl text-blue-500 mx-auto mb-4"></i>
                                <h3 className="text-2xl font-bold mb-4">
                                    User-Friendly
                                </h3>
                                <p className="text-gray-600">
                                    Our intuitive interface makes it easy to
                                    manage and retrieve your stored data.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
