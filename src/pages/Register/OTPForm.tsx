import Input from "@/components/Input";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axios.config";
import { useToast } from "@/hooks/use-toast";
import { IAxiosError } from "@/interfaces";
import { AxiosError } from "axios";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function OTPForm() {
  const INPUTS_LENGTH = 6;
  const [otp, setOtp] = useState(
    Array.from({ length: INPUTS_LENGTH }, () => "")
  );

  const { toast } = useToast();
  const { state, pathname } = useLocation();
  const email = state?.email;
  const time = state?.time;
  const [timeLeft, setTimeLeft] = useState<number>(time || 0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("load", () => {
      setTimeLeft(0);
    });
  }, []);

  useEffect(() => {
    if (email && timeLeft) {
      let prev = timeLeft;
      const interval = setInterval(() => {
        if (prev > 0) {
          document.getElementById("timeLeft")!.textContent = formatDate(
            prev - 1000
          );
          prev -= 1000;
          return;
        }

        setTimeLeft(0);
        clearInterval(interval);
        navigate(pathname, {
          state: { email, time: null },
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  const verifyOTP = async () => {
    try {
      setIsLoading(true);
      const otpCode = otp.join("");
      const { status } = await axiosInstance.post("/account/verify-otp", {
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

  const resendOTP = async () => {
    try {
      setIsLoading(true);
      const { status } = await axiosInstance.get(
        `/account/resend-otp?email=${email}`
      );
      if (status === 200) {
        toast({
          title: "OTP has been sent to your email",
          description: "check your email",
          variant: "success",
        });
        setTimeLeft(3 * 60 * 1000);
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
      className="!w-[40px] h-[40px] sm:!w-[50px] sm:h-[50px] text-center text-xl sm:text-2xl font-bold border-primary"
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
    <div className="relative container py-5 min-h-screen w-full ">
      <form
        className="flex flex-col text-center gap-3 w-[470px] mx-auto max-w-full"
        data-aos="fade-up"
        onSubmit={(e) => {
          e.preventDefault();
          verifyOTP();
        }}
      >
        <Logo className="text-2xl" />
        <img
          src="/imgs/verify.png"
          className="w-[150px] mx-auto"
          alt="verification code"
        />
        <h3 className="text-lg">
          Enter 6 digits code that you have received on email before expiration{" "}
          {timeLeft > 0 && (
            <>
              You have{" "}
              <span id="timeLeft" className="inline-block ">
                {formatDate(timeLeft)}
              </span>{" "}
              left to verify
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
              disabled={timeLeft > 0 || isLoading}
              onClick={resendOTP}
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
      <img
        src={"/imgs/square.svg"}
        className="w-[150px] md:w-[200px] fixed bottom-0 right-0 z-[-1]"
        alt="square shape"
      />
      <img
        src={"/imgs/square.svg"}
        className="w-[150px] md:w-[200px] fixed top-0 left-0 z-[-1] rotate-180"
        alt="square shape"
      />
    </div>
  );
}

export default OTPForm;
