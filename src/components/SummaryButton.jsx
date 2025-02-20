const SummaryButton = ({ onSummarize, text = "" }) => {
    if (!text || text.length > 150){
        return (
            <button className="summary-button" onClick={onSummarize}>
                Summarize
            </button>
        );

    }


};

export default SummaryButton;
