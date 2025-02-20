import { useState } from "react";
import { FaPaperPlane, FaMicrophone } from "react-icons/fa";

const InputBox = ({ onSend }) => {
    const [inputText, setInputText] = useState("");
    const [isRecording, setIsRecording] = useState(false);

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

    const handleVoiceInput = () => {
        if (!("webkitSpeechRecognition" in window)) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => setIsRecording(true);
        recognition.onend = () => setIsRecording(false);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputText(transcript);
        };

        recognition.start();
    };

    return (
        <div className="input-container">
            <textarea
                className="chat-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter Prompt"
                onKeyDown={handleKeyPress}
                aria-label="Message input"
            />
            <button
                onClick={handleSend}
                className="send-button"
                disabled={!inputText.trim()}
                aria-label="Send message"
            >
                <FaPaperPlane />
            </button>
            <button
                className={`audio-button ${isRecording ? "recording" : ""}`}
                onClick={handleVoiceInput}
                aria-label="Record audio"
            >
                <FaMicrophone />
            </button>
        </div>
    );
};

export default InputBox;
