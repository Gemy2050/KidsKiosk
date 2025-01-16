import Logo from "@/components/Logo";
import { SOCIAL_LINKS } from "@/data/links";

export default function Footer() {
  return (
    <footer className="bg-[#242424] text-white pt-20 text-center relative">
      <div className="container relative z-10">
        <div className="flex flex-wrap justify-center items-center ">
          <div
            data-aos="fade-up"
            className="w-full sm:w-1/2 md:w-1/3 sm:px-5 py-5 md:py-0"
          >
            <h3>
              <Logo className="text-2xl mb-3" />
            </h3>
            <p>
              Platform for Shoes that keep kids feet comfortable all day long.
            </p>
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
            <div className="flex gap-4 items-center justify-center">
              {SOCIAL_LINKS.map(({ name, link, icon: Icon }) => {
                return (
                  <a
                    key={name}
                    href={link}
                    target="_blank"
                    rel="noopener"
                    className="hover:text-primary duration-300"
                  >
                    <Icon size={25} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <p className="text-center mt-24 pb-10 text-[#B3B3B3]">
          @2024 Kids Kiosk. All rights reserved
        </p>
      </div>
      {/* Background Elements */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl "
        data-aos="fade-right"
      />
      <div
        className="absolute bottom-20 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl "
        data-aos="fade-left"
      />
    </footer>
  );
}
