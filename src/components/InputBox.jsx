import { useState } from "react";
import { FaPaperPlane, FaMicrophone } from "react-icons/fa";

const InputBox = ({ onSend }) => {
    const [inputText, setInputText] = useState("");

    const handleSend = () => {
        if (!inputText.trim()) return;
        onSend(inputText);
        setInputText("");
    };

    return (
        <div className="input-container">
      <textarea
          className="chat-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text..."
      />
            <button onClick={handleSend} className="send-button">
                <FaPaperPlane />
            </button>
            <button className="audio-button">
                <FaMicrophone />
            </button>
        </div>
    );
};

export default InputBox;
