export default function Quote() {
  return (
    <div className="overflow-hidden bg-primary px-2 py-24 text-white bg-[url('/imgs/ellipses.png')] bg-no-repeat bg-contain bg-left">
      <h3 className="flex justify-center items-center gap-3">
        <p data-aos="fade-right" className="text-2xl sm:text-3xl font-bold">
          Save Time Save Money
        </p>
        <img
          data-aos="fade-left"
          className="w-[45px] sm:w-[64px]"
          src="/imgs/smile.png"
          alt="smile"
          loading="lazy"
        />
      </h3>
    </div>
  );
}
