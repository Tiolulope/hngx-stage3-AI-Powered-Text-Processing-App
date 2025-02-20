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
        if (tokenElement) {
            setApiToken(tokenElement.content);
            console.log("API Token from meta:", tokenElement.content);
        } else {
            console.warn("API token meta tag not found! Using fallback.");
            setApiToken("\n" +
                "AuFXgJcLUjLclIYh6Qjl7oPqudB3yPjQeWrKTFnYrnpFV1N1WUgVqzzQHz8hl/KWrZ4EQsszHlgheb+xX7q/3w4AAABXeyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJmZWF0dXJlIjoiTGFuZ3VhZ2VEZXRlY3Rpb25BUEkiLCJleHBpcnkiOjE3NDk1OTk5OTl9\n" +
                "\n");
        }
    }, []);

    const getAIResponse = async (text) => {
        try {
            const response = await fetch("https://chromeai.googleusercontent.com/v1/text:summarize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiToken}`,
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API request failed: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            return data.result || "AI response unavailable.";
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setError(`API request failed: ${error.message}`);
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

            const detectedLang = await detectLanguage(inputText);
            setMessages((prevMessages) => [...prevMessages, { text: inputText, type: "user", detectedLang }]);

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
                    <Message key={index} text={msg.text} type={msg.type} detectedLang={msg.detectedLang} />
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
