const ErrorDialog = ({error, isOpen, onClose}) => {
    return isOpen ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              onClick={onClose}
              className="close-button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h3 className="modal-title">Error Details</h3>
            <p className="modal-text">{error}</p>
          </div>
        </div>
    ) : null;
}

export default ErrorDialog;