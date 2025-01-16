const ErrorButton = ({onClick, label}) => {
    return (
        <button
            onClick={onClick}
            className="error-button"
            >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span className="error-button-text">{label}</span>
        </button>
    )
}

export default ErrorButton