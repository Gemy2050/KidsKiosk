interface IProps {
  message?: string;
}

function ErrorMessage({ message }: IProps) {
  return <span className="text-red-600 block text-[12px]">{message}</span>;
}

export default ErrorMessage;
