import { forwardRef, InputHTMLAttributes, memo, Ref } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(
  ({ className, ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
    return (
      <input
        ref={ref}
        className={`text-[15px] p-[10px] bg-background outline-none shadow-md border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary rounded-lg w-full duration-300 ${className}`}
        {...rest}
      />
    );
  }
);

export default memo(Input);
