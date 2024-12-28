import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";
import { memo } from "react";

interface IProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  disabled?: boolean;
  onDelete: () => void;
}

function Alert({
  children,
  title,
  disabled,
  description = "",
  onDelete,
}: IProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={disabled}
        className="disabled:cursor-no-drop disabled:opacity-50"
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[90%] rounded-lg sm:w-[450px]">
        <AlertDialogHeader className="items-center">
          <AlertTriangle size={40} className="text-red-500 mx-auto mb-5" />
          <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-md">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 rounded-md"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default memo(Alert);
