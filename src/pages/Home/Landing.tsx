function Landing() {
  return (
    <section className="relative h-[calc(100vh-66px)] bg-[url('/public/imgs/landing.png')] bg-cover bg-left-top bg-no-repeat">
      <div className="absolute inset-0 bg-black/75 z-[0]"></div>
      <div className="container relative h-full flex justify-center items-center mx-auto pt-8 md:pt-16">
        <div
          data-aos="fade-up"
          className="w-[450px] mx-auto max-w-full ms-auto"
        >
          <h1 className="text-primary leading-none mb-4 text-center sm:text-start text-[32px] sm:text-[50px] font-bold">
            Purchase Your Shoes Now
          </h1>
          <p className="text-white text-2xl mix-blend-color-burn text-center sm:text-start">
            Shoes that keep kids feet comfortable all day long.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Landing;
