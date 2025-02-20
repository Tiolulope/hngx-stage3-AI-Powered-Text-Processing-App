const ErrorMessage = ({ message }) => {
  return message ? (
      <div className="error-message" role="alert">
        {message}
      </div>
  ) : null;
};

export default ErrorMessage;
