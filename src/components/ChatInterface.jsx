import { useEffect, useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import LanguageSelector from "./LanguageSelector";
import SummaryButton from "./SummaryButton";
import ErrorMessage from "./ErrorMessage";
// import ThemeSwitcher from "./ThemeSwitcher.jsx";

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
        } else {
            console.error("API token meta tag not found!");
            setError("API token is missing. Please check configuration.");
        }
    }, []);

    useEffect(() => {
        setApiToken(
            "AuFXgJcLUjLclIYh6Qjl7oPqudB3yPjQeWrKTFnYrnpFV1N1WUgVqzzQHz8hl/KWrZ4EQsszHlgheb+xX7q/3w4AAABXeyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJmZWF0dXJlIjoiTGFuZ3VhZ2VEZXRlY3Rpb25BUEkiLCJleHBpcnkiOjE3NDk1OTk5OTl9");
    }, []);



    useEffect(() => {
        console.log("API Token:", apiToken);
    }, [apiToken]);

    useEffect(() => {
        console.log("Messages updated:", messages);
    }, [messages]);

    const getAIResponse = async (text) => {
        try {
            const response = await fetch("https://chromeai.googleusercontent.com/v1/text:summarize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiToken}`,
                },
                body: JSON.stringify({text}),
            });

            if (!response.ok){
                const errorText = await response.text();
                throw new Error(`API request failed: ${response.status} - ${errorText}`);
            }


            const data = await response.json();
            return data.result || "AI response was not successfully retrieved!";
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setError(`API request failed: ${error.message}`);
            return "AI response unavailable.";
        }
    };



    const detectLanguage = async (text) => {
        if (!apiToken) {
            console.error("Missing API token");
            return "unknown";
        }

        try {
            const response = await fetch(`https://translation.googleapis.com/language/translate/v2/detect?key=${apiToken}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiToken}`,
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Language detection failed: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            return data.detectedLanguage || "unknown";
        } catch (error) {
            console.error("error detecting language:", error);
            setError(`failed to detect language: ${error.message}`);
            return "unknown";
        }
    };

    const handleSend = async () => {
        if (!inputText.trim()) return;
        if (!apiToken) {
            setError("API token is missing. Cannot send message.");
            return;
        }

        try {
            const detectedLang = await detectLanguage(inputText);
            console.log("Detected Language:", detectedLang);

            // setMessages([...messages, { text: inputText, sender: "user", lang: detectedLang }]);
            setMessages((prevMessages) => [...prevMessages, { text: inputText, sender: "user", lang: detectedLang, type: "user" }]);

            // setInputText("");
            setError(null);

            const aiResponse = await getAIResponse(inputText);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: aiResponse, sender: "ai", type: "ai" }
            ]);

        } catch (error) {
            console.error("Error sending message:", error);
            setError("Failed to send message. Please try again.");
        }


    };

    const handleSummarize = () => {
        const lastMessage = messages[messages.length - 1];
        if (!lastMessage || lastMessage.text.length > 150) return;

        const summary = `${lastMessage.text.slice(0, 100)}... [summary]`;
        setMessages((prev) => [...prev, { text: summary, id: Date.now(), type: "ai" }]);
    };

    return (
        <div className="chat-container">
            <h1 className="chat-title">Sultan-Lab</h1>
            {/*<div>*/}
            {/*    <ThemeSwitcher />*/}
            {/*</div>*/}
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <Message key={index} text={msg.text} type={msg.type} detectedLang={msg.lang} />
                ))}
            </div>
            <LanguageSelector selectedLang={selectedLang} onChange={setSelectedLang} />

            {messages.length > 0 && messages[messages.length - 1].text.length > 150 && (
                <SummaryButton text={messages[messages.length - 1].text} onSummarize={handleSummarize} />
            )}

            {error && <ErrorMessage message={error} />}
            <InputBox onSend={handleSend} />
        </div>
    );
};

export default ChatInterface;
