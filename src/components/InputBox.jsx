import { useState } from "react";
import { FaPaperPlane, FaMicrophone } from "react-icons/fa";
import PropTypes from "prop-types";

const InputBox = ({ onSend, setInputText, inputText, setError }) => {
    const [isRecording, setIsRecording] = useState(false);

    const handleSend = () => {
        if (!inputText.trim()) {
            setError("Input text cannot be empty."); // Use setError
            return;
        }
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
            setError("Speech recognition is not supported in this browser."); // Use setError
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
                onChange={(e) => {
                    setInputText(e.target.value);
                    setError(""); // Clear error when typing
                }}
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

InputBox.propTypes = {
    onSend: PropTypes.func.isRequired,
    setInputText: PropTypes.func.isRequired,
    inputText: PropTypes.string.isRequired,
    setError: PropTypes.func.isRequired, // Add setError to prop types
};

export default InputBox;