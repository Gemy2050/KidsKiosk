interface IProps {
  message?: string;
  className?: string;
}

function ErrorMessage({ message, className = "" }: IProps) {
  return (
    <span className={`text-red-600 block text-[12px] ${className}`}>
      {message}
    </span>
  );
}

export default ErrorMessage;
