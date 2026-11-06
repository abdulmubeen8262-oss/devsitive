import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-slate-950 text-white">

      {/* Hero Section */}
      <section className="min-h-[85vh] flex items-center px-6 md:px-20 py-20">
        <div className="max-w-3xl">

          <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm">
            Welcome to WebStudio
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mt-8 leading-tight">
            Build Your Digital
            <span className="text-blue-500"> Future </span>
            With Us.
          </h1>

          <p className="text-gray-400 text-lg mt-6 leading-8">
            We create modern, creative and responsive websites
            that help businesses grow in the digital world.
          </p>

          <div className="flex flex-wrap gap-4 mt-9">
            <Link
              to="/about"
              className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-lg font-semibold transition"
            >
              Explore More
            </Link>

            <Link
              to="/contact"
              className="border border-gray-500 hover:border-blue-500 px-7 py-3 rounded-lg transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-slate-900 py-20 px-6 md:px-20">

        <h2 className="text-3xl md:text-4xl font-bold text-center">
          What We Offer
        </h2>

        <p className="text-gray-400 text-center mt-4">
          Professional solutions for your digital needs.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14">

          {[
            {
              icon: "💻",
              title: "Web Development",
              desc: "Modern and responsive websites for your business.",
            },
            {
              icon: "🎨",
              title: "Creative Design",
              desc: "Beautiful user interfaces and engaging experiences.",
            },
            {
              icon: "⚡",
              title: "Fast Performance",
              desc: "Optimized websites with smooth performance.",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 hover:-translate-y-2 transition duration-300"
            >
              <div className="text-4xl">{service.icon}</div>

              <h3 className="text-xl font-bold mt-6">
                {service.title}
              </h3>

              <p className="text-gray-400 mt-4 leading-7">
                {service.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Have a Project in Mind?
        </h2>

        <p className="text-gray-400 mt-4">
          Let's work together and create something amazing.
        </p>

        <Link
          to="/contact"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg transition"
        >
          Get In Touch
        </Link>
      </section>

    </div>
  );
}

export default Home;