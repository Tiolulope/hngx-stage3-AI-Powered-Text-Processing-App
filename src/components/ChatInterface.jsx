import { useState } from "react";
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
    const [detectedLanguage, setDetectedLanguage] = useState("");
    const [summary, setSummary] = useState("");
    const [translation, setTranslation] = useState("");


    const detectLanguage = async (text) => {
        try {
            const response = await fetch("http://localhost:5000/detect-language", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) throw new Error("Language detection failed.");
            const data = await response.json();
            setDetectedLanguage(data.languages[0].languageCode);
        } catch (err) {
            console.error("Language detection error:", err);
            setError("Failed to detect language.");
        }
    };


    const handleTranslate = async () => {
        const lastMessage = messages[messages.length - 1];
        if (!lastMessage) return;

        try {
            const response = await fetch("http://localhost:5000/translate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: lastMessage.text, targetLang: selectedLang }),
            });

            if (!response.ok) throw new Error("Translation failed.");
            const data = await response.json();
            setTranslation(data.data.translations[0].translatedText);
        } catch (err) {
            console.error("Translation error:", err);
            setError("Failed to translate text.");
        }
    };


    const summarizeText = async (text) => {
        try {
            const summary = `${text.slice(0, 100)}... [summary]`;
            setSummary(summary);
        } catch (err) {
            console.error("Summarization error:", err);
            setError("Failed to summarize text.");
        }
    };

    const handleSend = async () => {
        if (!inputText.trim()) {
            setError("Input text cannot be empty.");
            return;
        }

        setError("");
        setMessages((prev) => [...prev, { text: inputText, type: "user" }]);
        setInputText("");

        await detectLanguage(inputText);


        if (inputText.length > 150 && detectedLanguage === "en") {
            await summarizeText(inputText);
        }
    };


    const handleSummarize = async () => {
        const lastMessage = messages[messages.length - 1];
        if (!lastMessage || lastMessage.text.length <= 150 || detectedLanguage !== "en") return;
        await summarizeText(lastMessage.text);
    };

    return (
        <div className="chat-container">
            <h1 className="chat-title">SultanLab</h1>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <Message
                        key={index}
                        text={msg.text}
                        type={msg.type}
                        detectedLang={detectedLanguage}
                    />
                ))}
                {detectedLanguage && <p>Detected Language: {detectedLanguage}</p>}
                {summary && <p>Summary: {summary}</p>}
                {translation && <p>Translation: {translation}</p>}
            </div>
            <LanguageSelector selectedLang={selectedLang} onChange={setSelectedLang} />
            {messages.length > 0 && messages[messages.length - 1].text.length > 150 && detectedLanguage === "en" && (
                <SummaryButton onSummarize={handleSummarize} />
            )}
            <button onClick={handleTranslate} aria-label="Translate">
                Translate
            </button>
            {error && <ErrorMessage message={error} />}
            <InputBox onSend={handleSend} setInputText={setInputText} inputText={inputText} setError = {setError} />
        </div>
    );
};

export default ChatInterface;