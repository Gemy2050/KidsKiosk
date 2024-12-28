import Logo from "@/components/Logo";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#222] text-white pt-20 text-center">
      <div className="container">
        <div className="flex flex-wrap justify-center items-center ">
          <div
            data-aos="fade-up"
            className="w-full sm:w-1/2 md:w-1/3 sm:px-5 py-5 md:py-0"
          >
            <h3>
              <Logo className="text-2xl mb-3" />
            </h3>
            <p>Platform for newsletter fans and Owners</p>
          </div>
          <div
            data-aos="fade-up"
            className="w-full sm:w-1/2 md:w-1/3 sm:px-5 py-5 md:py-0"
          >
            <h4 className="text-[#B3B3B3] mb-5">Mail us at:</h4>
            <p>kidsKiosk@contact.com</p>
          </div>
          <div
            data-aos="fade-up"
            className="w-full sm:w-1/2 md:w-1/3 sm:px-5 py-5 md:py-0"
          >
            <h4 className="text-[#B3B3B3] mb-5">Follow Us</h4>
            <div className="flex gap-5 items-center justify-center">
              <Link to={"#"}>
                <Facebook size={30} />
              </Link>
              <Link to={"#"}>
                <Linkedin size={30} />
              </Link>
              <Link to={"#"}>
                <Twitter size={30} />
              </Link>
            </div>
          </div>
        </div>
        <p className="text-center mt-24 pb-10 text-[#B3B3B3]">
          @2024 Kids Kiosk. All rights reserved
        </p>
      </div>
    </footer>
  );
}
