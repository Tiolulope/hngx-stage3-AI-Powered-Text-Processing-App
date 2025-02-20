const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const VITE_GOOGLE_API_KEY = "\n" +
    "AqGH/tGtdEB06ziNY6j3sQmRPRhBAgPMQwUgYrbIye/BImMfStlYQyc/b/yBxgxLLC3PvHxDPfRFT1XakdWPuwwAAAB1eyJvcmlnaW4iOiJodHRwczovL3NvZnR3YXJlc3VsdGFuMy52ZXJjZWwuYXBwOjQ0MyIsImZlYXR1cmUiOiJUcmFuc2xhdGlvbkFQSSIsImV4cGlyeSI6MTc1MzE0MjQwMCwiaXNTdWJkb21haW4iOnRydWV9";

app.post("/detect-language", async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Text is required." });
        }

        const response = await axios.post(
            `https://language.googleapis.com/v1/documents:detectLanguage?key=${VITE_GOOGLE_API_KEY}`,
            {
                document: {
                    content: text,
                    type: "PLAIN_TEXT",
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error("Language detection error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to detect language." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post("/translate", async (req, res) => {
    try {
        const { text, targetLang } = req.body;
        const response = await axios.post(
            `https://translation.googleapis.com/language/translate/v2?key=${VITE_GOOGLE_API_KEY}`,
            {
                q: text,
                target: targetLang,
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error("Translation error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to translate text." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});