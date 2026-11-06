import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(
      "Your message has been submitted successfully!"
    );

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen py-20 px-6">

      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-12">
          <span className="text-blue-400 font-semibold">
            GET IN TOUCH
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Contact Us
          </h1>

          <p className="text-gray-400 mt-5">
            Have a question? We'd love to hear from you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 p-6 md:p-10 rounded-2xl shadow-xl space-y-6"
        >

          <div>
            <label className="block mb-2 text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">
              Message
            </label>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows="5"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-lg font-semibold transition"
          >
            Send Message →
          </button>

          {success && (
            <p className="bg-green-500/10 text-green-400 border border-green-500/30 p-4 rounded-lg text-center">
              {success}
            </p>
          )}

        </form>

      </div>
    </div>
  );
}

export default Contact;