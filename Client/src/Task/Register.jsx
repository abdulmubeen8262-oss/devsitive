
import { useState } from "react";
import axios from "axios";
import {
  Heart,
  Moon,
  Sun,
  Eye,
  EyeOff,
  ArrowRight,
  Upload,
  User,
  Mail,
  Phone,
  Globe,
  CreditCard,
} from "lucide-react";

function Register() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    cnic: "",
    country: "",
    gender: "",
    password: "",
    profilePicture: null,
    accountType: "",
  });

  // Toggle Theme
  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setMessage("");
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.cnic.trim()) {
      newErrors.cnic = "CNIC is required";
    } else if (!/^\d{5}-\d{7}-\d{1}$/.test(formData.cnic)) {
      newErrors.cnic = "Format: 12345-1234567-1";
    }

    if (!formData.country) {
      newErrors.country = "Please select country";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Minimum 8 characters required";
    }

    if (!formData.profilePicture) {
      newErrors.profilePicture = "Please upload a picture";
    }

    if (!formData.accountType) {
      newErrors.accountType = "Select account type";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Register API Integration
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          data.append(key, value);
        }
      });

      const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
  formData
);

      setMessage(
        response.data.message || "Registration successful!"
      );

      setMessageType("success");

      setFormData({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        cnic: "",
        country: "",
        gender: "",
        password: "",
        profilePicture: null,
        accountType: "",
      });

      e.target.reset();
      setErrors({});

    } catch (error) {
      console.error("REGISTER ERROR:", error);

      setMessage(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );

      setMessageType("error");

    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${
    darkMode
      ? "border-gray-600 bg-[#273449] text-white placeholder:text-gray-500"
      : "border-slate-200 bg-white text-slate-800 placeholder:text-slate-400"
  }`;

  const labelClass = `mb-2 block text-xs font-bold tracking-wide ${
    darkMode ? "text-gray-300" : "text-slate-600"
  }`;

  const errorText = (field) =>
    errors[field] && (
      <p className="mt-1 text-xs text-red-500">
        {errors[field]}
      </p>
    );

  return (
    <div
      className={`min-h-screen p-4 sm:p-8 transition-colors ${
        darkMode ? "bg-[#111827]" : "bg-[#eef4f7]"
      }`}
      style={{
        backgroundImage: darkMode
          ? "linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px)"
          : "linear-gradient(rgba(80,110,130,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(80,110,130,.1) 1px,transparent 1px)",
        backgroundSize: "42px 42px",
      }}
    >
      <div
        className={`mx-auto max-w-5xl overflow-hidden rounded-3xl shadow-2xl ${
          darkMode ? "bg-[#1e293b]" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#117c76] to-[#087b96] px-6 py-5 sm:px-10">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-white/20 bg-white/10 p-2">
              <Heart className="text-white" size={21} />
            </div>

            <h1 className="text-lg font-bold text-white">
              VetScribe<span className="text-teal-200">AI</span>
            </h1>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl border border-white/25 bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 sm:p-10">
          <div className="mb-8">
            <h2
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Create your account
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Register your clinic workspace with VetScribeAI.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* 1 Full Name */}
              <div>
                <label className={labelClass}>01. FULL NAME</label>

                <div className="relative">
                  <User
                    className="absolute left-4 top-3.5 text-slate-400"
                    size={17}
                  />

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`${inputClass} pl-11`}
                  />
                </div>

                {errorText("fullName")}
              </div>

              {/* 2 Username */}
              <div>
                <label className={labelClass}>02. USERNAME</label>

                <input
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  className={inputClass}
                />

                {errorText("username")}
              </div>

              {/* 3 Email */}
              <div>
                <label className={labelClass}>03. EMAIL ADDRESS</label>

                <div className="relative">
                  <Mail
                    className="absolute left-4 top-3.5 text-slate-400"
                    size={17}
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${inputClass} pl-11`}
                  />
                </div>

                {errorText("email")}
              </div>

              {/* 4 Phone */}
              <div>
                <label className={labelClass}>04. PHONE NUMBER</label>

                <div className="relative">
                  <Phone
                    className="absolute left-4 top-3.5 text-slate-400"
                    size={17}
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${inputClass} pl-11`}
                  />
                </div>

                {errorText("phone")}
              </div>

              {/* 5 CNIC */}
              <div>
                <label className={labelClass}>05. CNIC NUMBER</label>

                <div className="relative">
                  <CreditCard
                    className="absolute left-4 top-3.5 text-slate-400"
                    size={17}
                  />

                  <input
                    type="text"
                    name="cnic"
                    placeholder="12345-1234567-1"
                    value={formData.cnic}
                    onChange={handleChange}
                    maxLength={15}
                    className={`${inputClass} pl-11`}
                  />
                </div>

                {errorText("cnic")}
              </div>

              {/* 6 Country */}
              <div>
                <label className={labelClass}>06. COUNTRY</label>

                <div className="relative">
                  <Globe
                    className="absolute left-4 top-3.5 text-slate-400"
                    size={17}
                  />

                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`${inputClass} pl-11`}
                  >
                    <option value="">Select your country</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {errorText("country")}
              </div>

              {/* 7 Gender */}
              <div>
                <label className={labelClass}>07. GENDER</label>

                <div
                  className={`flex gap-5 rounded-xl border p-3 ${
                    darkMode
                      ? "border-gray-600"
                      : "border-slate-200"
                  }`}
                >
                  {["Male", "Female", "Other"].map((item) => (
                    <label
                      key={item}
                      className={`flex cursor-pointer items-center gap-2 text-sm ${
                        darkMode ? "text-gray-300" : "text-slate-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={item}
                        checked={formData.gender === item}
                        onChange={handleChange}
                        className="accent-teal-600"
                      />
                      {item}
                    </label>
                  ))}
                </div>

                {errorText("gender")}
              </div>

              {/* 8 Password */}
              <div>
                <label className={labelClass}>08. PASSWORD</label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Minimum 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-slate-400"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errorText("password")}
              </div>

              {/* 9 Profile Picture */}
              <div>
                <label className={labelClass}>
                  09. PROFILE PICTURE
                </label>

                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border border-dashed p-3 transition hover:border-teal-500 ${
                    darkMode
                      ? "border-gray-600 text-gray-300"
                      : "border-slate-300 text-slate-600"
                  }`}
                >
                  <Upload size={20} className="text-teal-500" />

                  <span className="truncate text-sm">
                    {formData.profilePicture
                      ? formData.profilePicture.name
                      : "Choose profile picture"}
                  </span>

                  <input
                    type="file"
                    name="profilePicture"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>

                {errorText("profilePicture")}
              </div>

              {/* 10 Account Type */}
              <div>
                <label className={labelClass}>10. ACCOUNT TYPE</label>

                <div
                  className={`flex flex-wrap gap-5 rounded-xl border p-3 ${
                    darkMode
                      ? "border-gray-600"
                      : "border-slate-200"
                  }`}
                >
                  {["Clinic", "Veterinarian", "Admin"].map((item) => (
                    <label
                      key={item}
                      className={`flex cursor-pointer items-center gap-2 text-sm ${
                        darkMode ? "text-gray-300" : "text-slate-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name="accountType"
                        value={item}
                        checked={formData.accountType === item}
                        onChange={handleChange}
                        className="accent-teal-600"
                      />
                      {item}
                    </label>
                  ))}
                </div>

                {errorText("accountType")}
              </div>
            </div>

            {/* API Message */}
            {message && (
              <div
                className={`mt-5 rounded-xl border p-3 text-sm ${
                  messageType === "success"
                    ? "border-teal-300 bg-teal-50 text-teal-700"
                    : "border-red-300 bg-red-50 text-red-600"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#009f91] to-[#0099bd] py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRight size={17} />}
            </button>

            <p className="mt-5 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-bold text-teal-600 hover:underline"
              >
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

