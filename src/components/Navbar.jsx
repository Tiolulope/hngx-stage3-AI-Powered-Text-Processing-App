import { useState, useEffect } from "react";

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
        document.body.classList.toggle("light-mode", !darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
        <nav className="navbar">
            <h2 className="navbar-title">AI Text Processing Engine</h2>
            <button
                className={`mode-toggle ${darkMode ? "dark" : "light"}`}
                onClick={() => setDarkMode(!darkMode)}
            >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
        </nav>
    );
};

export default Navbar;