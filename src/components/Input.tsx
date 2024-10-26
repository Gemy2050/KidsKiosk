import { forwardRef, InputHTMLAttributes, memo, Ref } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(
  ({ className, ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
    return (
      <input
        ref={ref}
        className={`p-2 outline-none shadow-md border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary rounded-lg w-full duration-300 ${className}`}
        {...rest}
      />
    );
  }
);

export default memo(Input);
