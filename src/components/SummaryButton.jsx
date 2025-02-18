const SummaryButton = ({ onSummarize, text }) => {
    return (
        text.length > 150 && (
            <button className="summary-button" onClick={onSummarize}>
                Summarize
            </button>
        )
    );
};

export default SummaryButton;
