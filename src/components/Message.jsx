import PropTypes from "prop-types";

const Message = ({ text = "No message", type = "user", detectedLang }) => {
    const messageClass = `message ${type === "user" ? "user-message" : "ai-message"}`;

    return (
        <div className={messageClass} aria-label={type === "user" ? "User message" : "AI response"}>
            <span className="message-text">{text}</span>
            {detectedLang && <span className="language-tag">Detected: {detectedLang}</span>}
        </div>
    );
};

Message.propTypes = {
    text: PropTypes.string,
    type: PropTypes.oneOf(["user", "ai"]),
    detectedLang: PropTypes.string,
};

export default Message;
