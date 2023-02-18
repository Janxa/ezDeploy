function ErrorMessage({ message, onButtonClick,buttonContent}) {
    return (
      <div className="font-medium text-sm py-1 text-color-red-primary">
        {message}
        {onButtonClick && (
          <button
            onClick={onButtonClick}
            className="font-medium text-color-blue-primary underline decoration-dashed"
          >
            {buttonContent}
          </button>
        )}
      </div>
    );
  }
export default ErrorMessage;