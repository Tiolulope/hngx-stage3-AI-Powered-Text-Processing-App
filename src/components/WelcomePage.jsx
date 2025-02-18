import { useNavigate } from "react-router-dom";
// import {useEffect, useState} from "react";
// import ThemeSwitcher from "./ThemeSwitcher.jsx";

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="welcome-container">
            <div className="header">
                <h1 className="title">
                    Welcome to Sultan-Lab AI Text Processor Engine
                </h1>

                {/*<span>*/}
                {/*    <ThemeSwitcher />*/}
                {/*</span>*/}
            </div>
            <p className="description">AI-powered text processing with summarization, translation, and more let&apos;s dive in.</p>
            <button onClick={() => navigate("/chat")} className="start-button">
                Get Started
            </button>
        </div>
    );
};

export default WelcomePage;