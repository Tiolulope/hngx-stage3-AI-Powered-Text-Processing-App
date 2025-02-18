import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WelcomePage from "./components/WelcomePage";
import ChatInterface from "./components/ChatInterface";
import "./styles.css";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/chat" element={<ChatInterface />} className="app-container" />
            </Routes>
        </Router>
    );
}

export default App;
