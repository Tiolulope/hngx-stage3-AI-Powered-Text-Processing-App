import {useEffect, useState} from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import LanguageSelector from "./LanguageSelector";
import SummaryButton from "./SummaryButton";
import ErrorMessage from "./ErrorMessage";
import ThemeSwitcher from "./ThemeSwitcher.jsx";


//Let's talk to API Here

const API_TOKEN = import.meta.env.VITE_TRANSLATOR_API_KEY;

const translateText = async (text, targetLang) => {
    try {
        const response = await fetch("https://chromeai.googleusercontent.com/v1/translator:translateText", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_TOKEN}`,
            },
            body: JSON.stringify({
                text: text,
                target_language: targetLang,
            }),
        });

        if(!response.ok) {
            throw new Error(`Could not Translate: ${response.statusText}`)
        }

        const data = await response.json();
        return data.translatedText;
    } catch (error) {
        console.error("Error translating text:", error);
        return "Translation error";
    }
};






const ChatInterface = () => {
    const [messages, setMessages] = useState(() => {
        return JSON.parse(localStorage.getItem("chatMessages")) || [];
    });
    const [selectedLang, setSelectedLang] = useState("en");
    const [error, setError] = useState("");

    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }, [messages]);

    // const detectLanguage = () => {
    //     return text.match(/[a-zA-Z]/) ? "ru" : "en";
    // };

    const handleSend = (text) => {
        const newMessage = { text, id: Date.now(), type: "user", lang: detectLanguage(text) };
        setMessages([...messages, newMessage]);

        setTimeout(() => {
            const aiMessage = {text: `AI response to: "${text}"`, id: Date.now() + 1, type: "ai" };
            setMessages((prev) => [...prev, aiMessage]);
        }, 1000)
    };

    const handleSpeech = () => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.onresult = (event) => {
            setInputText(event.result[0][0].transcript)
        };
        recognition.start();
    }

    const handleSummarize = () => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.text.length > 150) {
            const summary = `${lastMessage.text.slice(0, 100)}... [summary]`;
            setMessages((prev) => [...prev, {text: summary, id: Date.now(), type: "ai"}]);
        }
        console.log("Summarizing text...");
    };

    return (
        <div className="chat-container">
            <h2 className="chat-title">Sultan-Lab</h2>
            <div>
                <ThemeSwitcher />
            </div>
            <div className="chat-box">
                {messages.map((msg) => (
                    <Message key={msg.id} text={msg.text} type={msg.type} detectedLang={msg.lang} />
                ))}
            </div>
            <LanguageSelector selectedLang={selectedLang} onChange={setSelectedLang} />
            <SummaryButton text="Sample long text here..." onSummarize={handleSummarize} />
            <ErrorMessage message={error} />
            <InputBox onSend={handleSend} />
        </div>
    );
};

export default ChatInterface;
