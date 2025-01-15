import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      <div
        className="relative z-10 text-center"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h1
          className="text-9xl font-bold text-primary"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          404
        </h1>

        <p
          className="mt-4 mb-3 text-2xl text-muted-foreground"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Oops! Page not found
        </p>

        <Button
          rounded={"md"}
          data-aos="fade-up"
          data-aos-delay="600"
          onClick={() => navigate("/")}
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Button>
      </div>

      {/* Background Elements */}
      <div
        className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl animate-pulse"
        data-aos="fade-right"
      />
      <div
        className="absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl animate-pulse"
        data-aos="fade-left"
      />
    </div>
  );
};

export default NotFound;
