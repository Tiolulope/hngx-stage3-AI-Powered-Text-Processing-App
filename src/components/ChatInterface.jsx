import { useEffect, useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import LanguageSelector from "./LanguageSelector";
import SummaryButton from "./SummaryButton";
import ErrorMessage from "./ErrorMessage";

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [selectedLang, setSelectedLang] = useState("en");
    const [inputText, setInputText] = useState("");
    const [error, setError] = useState(null);
    const [apiToken, setApiToken] = useState("");

    useEffect(() => {
        const tokenElement = document.querySelector("meta[name='google-ai-api-token']");
        if (tokenElement?.content) {
            setApiToken(tokenElement.content);
            console.log("API Token retrieved:", tokenElement.content);
        } else {
            console.error("API token meta tag not found or empty!");
            setError("Missing API token.");
        }
    }, []);

    const getAIResponse = async (text) => {
        if (!apiToken) {
            setError("API token is missing.");
            return "AI response unavailable.";
        }

        try {
            const response = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiToken}`,
                },
                body: JSON.stringify({
                    text,
                    max_length: 150,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API request failed: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log("AI Response:", data);
            return data?.result ?? "AI response unavailable.";
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setError(error.message);
            return "AI response unavailable.";
        }
    };

    const handleSend = async () => {
        if (!inputText.trim()) return;
        if (!apiToken) {
            setError("API token is missing.");
            return;
        }

        try {
            setMessages((prevMessages) => [...prevMessages, { text: inputText, type: "user" }]);
            setInputText("");

            const aiResponse = await getAIResponse(inputText);
            setMessages((prevMessages) => [...prevMessages, { text: aiResponse, type: "ai" }]);
        } catch (error) {
            console.error("Error sending message:", error);
            setError("Failed to send message.");
        }
    };

    const handleSummarize = () => {
        const lastMessage = messages[messages.length - 1];
        if (!lastMessage || lastMessage.text.length <= 150) return;

        const summary = `${lastMessage.text.slice(0, 100)}... [summary]`;
        setMessages((prev) => [...prev, { text: summary, type: "ai" }]);
    };

    return (
        <div className="chat-container">
            <h1 className="chat-title">Sultan-Lab</h1>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <Message key={index} text={msg.text} type={msg.type} />
                ))}
            </div>
            <LanguageSelector selectedLang={selectedLang} onChange={setSelectedLang} />
            {messages.length > 0 && messages[messages.length - 1].text.length > 150 && (
                <SummaryButton text={messages[messages.length - 1].text} onSummarize={handleSummarize} />
            )}
            {error && <ErrorMessage message={error} />}
            <InputBox onSend={handleSend} setInputText={setInputText} inputText={inputText} />
        </div>
    );
};

export default ChatInterface;
