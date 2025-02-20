const Message = ({ text = "No message", type = "user", detectedLang }) => {
    return (
        <div
            className={`message ${type === "user" ? "user-message" : "ai-message"}`}
            aria-label={type === "user" ? "User message" : "AI response"}
        >
            <span className="message-text">{text}</span>
            {detectedLang && <span className="language-tag">Detected: {detectedLang}</span>}
        </div>
    );
};

export default Message;

