function About() {
  return (
    <div className="bg-slate-950 text-white min-h-screen">

      <section className="py-20 px-6 md:px-20 text-center">

        <span className="text-blue-400 font-semibold">
          WHO WE ARE
        </span>

        <h1 className="text-4xl md:text-5xl font-bold mt-5">
          About WebStudio
        </h1>

        <p className="max-w-3xl mx-auto text-gray-400 mt-7 text-lg leading-8">
          WebStudio is a creative digital platform focused on
          building modern websites and providing quality digital
          experiences. We believe in creativity, innovation
          and customer satisfaction.
        </p>

      </section>

      <section className="grid md:grid-cols-2 gap-8 px-6 md:px-20 pb-20">

        <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl">
          <div className="text-4xl">🎯</div>

          <h2 className="text-2xl font-bold mt-5">
            Our Mission
          </h2>

          <p className="text-gray-400 mt-4 leading-7">
            Our mission is to deliver creative, reliable and
            user-friendly digital solutions that make a
            positive difference.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl">
          <div className="text-4xl">🚀</div>

          <h2 className="text-2xl font-bold mt-5">
            Our Vision
          </h2>

          <p className="text-gray-400 mt-4 leading-7">
            Our vision is to become a trusted digital platform
            known for innovation, quality and excellent service.
          </p>
        </div>

      </section>

      <section className="text-center pb-20 px-6">
        <h2 className="text-3xl font-bold">
          Why Choose Us?
        </h2>

        <div className="flex flex-wrap justify-center gap-5 mt-8">
          {["Creative Ideas", "Modern Technology", "Responsive Design", "Quality Work"].map(
            (item) => (
              <div
                key={item}
                className="bg-blue-600/10 border border-blue-500/30 px-6 py-4 rounded-xl text-blue-300"
              >
                ✓ {item}
              </div>
            )
          )}
        </div>
      </section>

    </div>
  );
}

export default About;