export default function Quote() {
  return (
    <div className="bg-primary px-2 py-24 text-white bg-[url('/public/imgs/ellipses.png')] bg-no-repeat bg-contain bg-left">
      <h3 data-aos="fade-up" className="flex justify-center items-center gap-3">
        <p className="text-2xl sm:text-3xl font-bold">Save Time Save Money</p>
        <img
          data-aos="fade-down"
          className="w-[45px] sm:w-[64px]"
          src="/public/imgs/smile.png"
          alt="smile"
          loading="lazy"
        />
      </h3>
    </div>
  );
}
