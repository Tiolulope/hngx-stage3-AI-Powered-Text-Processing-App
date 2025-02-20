const SummaryButton = ({ onSummarize }) => {
    return (
        <button onClick={onSummarize} aria-label="Summarize">
            Summarize
        </button>
    );
};

export default SummaryButton;