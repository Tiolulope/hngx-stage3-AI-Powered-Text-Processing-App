import { useState } from "react";
import { FaPaperPlane, FaMicrophone } from "react-icons/fa";

const InputBox = ({ onSend }) => {
    const [inputText, setInputText] = useState("");

    const handleSend = () => {
        if (!inputText.trim()) return;
        onSend(inputText);
        setInputText("");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="input-container">
            <textarea
                className="chat-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter Prompt"
                onKeyDown={handleKeyPress}
            />
            <button
                onClick={handleSend}
                className="send-button"
                disabled={!inputText.trim()}
                aria-label="Send message"
            >
                <FaPaperPlane />
            </button>
            <button className="audio-button" aria-label="Record audio">
                <FaMicrophone />
            </button>
        </div>
    );
};

export default InputBox;
