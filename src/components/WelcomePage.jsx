import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="welcome-container">
            <div className="header">
                <h1 className="title">
                    Welcome to SultanLab.AI Text Processing App
                </h1>
            </div>
            <p className="description">
                Enjoy The AI-powered text processing with summarization, translation, and text detection. Let&apos;s dive in.
            </p>
            <button onClick={() => navigate("/chat")} className="start-button">
                Get Started
            </button>
        </div>
    );
};

export default WelcomePage;