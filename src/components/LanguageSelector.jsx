const LanguageSelector = ({ selectedLang, onChange }) => {
    const languages = [
        { code: "en", name: "English" },
        { code: "pt", name: "Portuguese" },
        { code: "es", name: "Spanish" },
        { code: "ru", name: "Russian" },
        { code: "tr", name: "Turkish" },
        { code: "fr", name: "French" },
    ];

    return (
        <div className="language-selector">
            <label htmlFor="language-select">Select Language:</label>
            <select
                id="language-select"
                value={selectedLang}
                onChange={(e) => onChange(e.target.value)}
                aria-label="Select language"
            >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;