import { forwardRef, InputHTMLAttributes, memo, Ref } from "react";

interface IProps extends InputHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef(
  ({ className, children, ...rest }: IProps, ref: Ref<HTMLSelectElement>) => {
    return (
      <select
        ref={ref}
        className={`text-[15px] h-[44.5px] p-[10px] outline-none shadow-md border bg-background border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary rounded-lg w-full duration-300 ${className}`}
        {...rest}
      >
        {children}
      </select>
    );
  }
);

export default memo(Select);
