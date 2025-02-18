const Message = ({ text, type, detectedLang }) => {
    return (
        <div className={`message ${type === "user" ? "user-message" : "ai-message"}`}>
            <p>{text}</p>
            {detectedLang && <span className="language-tag">Detected: {detectedLang}</span>}
        </div>
    );
};

export default Message;
