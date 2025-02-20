const SummaryButton = ({ onSummarize }) => {
    return (
        <button
            onClick={onSummarize}
            className="summary-button"
            aria-label="Summarize"
        >
            Summarize
        </button>
    );
};

export default SummaryButton;