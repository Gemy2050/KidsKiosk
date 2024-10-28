import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axios.config";
import { useToast } from "@/hooks/use-toast";
import { IAxiosError } from "@/interfaces";
import { AxiosError } from "axios";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const time = sessionStorage.getItem("time");
const savedTime = time ? +time : null;

function OTPForm() {
  const TIME_EXPIRATION = ![null, undefined, NaN].includes(savedTime)
    ? savedTime!
    : 2 * 60 * 1000;
  const INPUTS_LENGTH = 6;
  const [otp, setOtp] = useState(
    Array.from({ length: INPUTS_LENGTH }, () => "")
  );
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const { state, pathname } = useLocation();
  const email = state?.email;
  const time = state?.time;
  const [timeLeft, setTimeLeft] = useState<number>(time || 0);
  console.log({ state, timeLeft });

  const navigate = useNavigate();

  useEffect(() => {
    if (email && timeLeft) {
      const interval = setInterval(() => {
        setTimeLeft((prev: number) => {
          if (prev > 0) {
            sessionStorage.setItem("time", String(prev - 1000));
            return prev - 1000;
          }
          sessionStorage.setItem("time", "0");
          clearInterval(interval);
          navigate(pathname, {
            state: { email, time: null },
          });
          return 0;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  const verifyOTP = async () => {
    try {
      setIsLoading(true);
      const otpCode = otp.join("");
      const { status } = await axiosInstance.post("/Account/verify-otp", {
        email: email,
        otp: otpCode,
      });
      if (status === 200) {
        toast({
          title: "Success",
          description: "You have successfully verified your account",
          variant: "success",
        });
        navigate("/login", {
          replace: true,
        });
      }
    } catch (err) {
      const error = err as AxiosError<IAxiosError>;
      toast({
        title: error.response?.data?.message || "Something went wrong",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: number) => {
    const minutes = Math.floor(date / 60000);
    const seconds = Math.floor((date % 60000) / 1000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]{1}$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      const next = e.target.nextElementSibling as HTMLInputElement;
      if (next) {
        next.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    const input = document.getElementById(`otp-${index}`) as HTMLInputElement;
    if (input.value && e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    } else if (!input.value && e.key === "Backspace") {
      const prev = input.previousElementSibling as HTMLInputElement;
      if (prev) {
        prev.focus();
      }
    }
  };

  if (!state?.email) {
    return <Navigate to={"/login"} replace />;
  }

  //*  Render Inputs
  const renderInputs = Array.from({ length: INPUTS_LENGTH }, (_, i) => (
    <Input
      type="number"
      key={i}
      className="[&::placeholder]:leading-10 !w-[40px] h-[40px] sm:!w-[50px] sm:h-[50px] text-center text-xl sm:text-2xl font-bold border-primary"
      maxLength={1}
      min={0}
      max={9}
      required
      autoFocus={i === 0}
      placeholder="*"
      id={`otp-${i}`}
      value={otp[i]}
      onChange={(e) => handleChange(e, i)}
      onKeyDown={(e) => handleKeyDown(e, i)}
    />
  ));

  return (
    <form
      className="flex flex-col text-center gap-3 w-[470px] max-w-full mx-auto md:mx-0"
      data-aos="fade-right"
      onSubmit={(e) => {
        e.preventDefault();
        verifyOTP();
      }}
    >
      <h3 className="text-lg">
        please Enter 6 digits code that you have received on email before
        expiration{" "}
        {timeLeft > 0 && (
          <>
            You have{" "}
            <span className="inline-block ">{formatDate(timeLeft)}</span>{" "}
            minutes left to verify
          </>
        )}
      </h3>
      <div className="flex gap-2 sm:gap-4 mt-5 justify-center">
        {renderInputs}
      </div>

      <div className="mb-4">
        <p>
          Don't receive code?{" "}
          <Button
            variant="link"
            className="p-0"
            size={"sm"}
            type="button"
            disabled={timeLeft > 0}
            onClick={() => console.log("Click")}
          >
            Resend
          </Button>
        </p>
      </div>

      <Button
        size="lg"
        className="w-fit px-24 mx-auto border disabled:cursor-no-drop"
        disabled={isLoading}
      >
        Verify
      </Button>
    </form>
  );
}

export default OTPForm;
