const LanguageSelector = ({ selectedLang, onChange }) => {
    return (
        <select className="language-selector" value={selectedLang} onChange={(e) => onChange(e.target.value)}>
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
            <option value="es">Spanish</option>
            <option value="ru">Russian</option>
            <option value="tr">Turkish</option>
            <option value="fr">French</option>
        </select>
    );
};

export default LanguageSelector;
