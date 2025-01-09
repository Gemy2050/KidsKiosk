import { forwardRef, memo, Ref, TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef(
  ({ className, ...rest }: IProps, ref: Ref<HTMLTextAreaElement>) => {
    return (
      <textarea
        ref={ref}
        className={`h-[200px] resize-none block text-[15px] p-[10px] bg-background outline-none shadow-md border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary rounded-lg w-full duration-300 ${className}`}
        {...rest}
      />
    );
  }
);

export default memo(Textarea);
