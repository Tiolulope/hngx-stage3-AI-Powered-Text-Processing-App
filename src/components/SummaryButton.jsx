import { useState } from "react";

const SummaryButton = ({ onSummarize, text = "" }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        await onSummarize();
        setIsLoading(false);
    };

    return (
        <button
            className="summary-button"
            onClick={handleClick}
            disabled={!text || text.length <= 150 || isLoading}
        >
            {isLoading ? "Summarizing..." : "Summarize"}
        </button>
    );
};

export default SummaryButton;
