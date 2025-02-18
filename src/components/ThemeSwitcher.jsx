import React, {useEffect, useState} from 'react'

const ThemeSwitcher = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light")
    }, [darkMode]);
    return (
        <button className="theme-switcher" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "🌙 Dark Mode" : " 🔆Light Mode"}
        </button>
    )
}
export default ThemeSwitcher
