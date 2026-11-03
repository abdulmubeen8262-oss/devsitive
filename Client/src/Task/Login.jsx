import { useState } from "react";
import axios from "axios";
import { Heart, Moon,Sun,Eye,EyeOf,ArrowRight,Mic,ClipboardList,Lightbulb,ShieldCheck,
} from "lucide-react";

const Login = () => {
  // Theme management
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Login API integration
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      // Store authentication token
      localStorage.setItem("token", response.data.token);

      // Navigate after successful login
      window.location.href = "/dashboard";

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const dark = darkMode;

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center p-4 sm:p-8 transition-colors duration-300 ${
        dark
          ? "bg-[#111827]"
          : "bg-[#eef4f7]"
      }`}
      style={{
        backgroundImage: dark
          ? "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)"
          : "linear-gradient(rgba(80,110,130,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(80,110,130,0.10) 1px, transparent 1px)",
        backgroundSize: "42px 42px",
      }}
    >
      {/* Main Card */}
      <div
        className={`w-full max-w-[960px] min-h-[515px] grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-[26px] shadow-2xl transition-colors duration-300 ${
          dark ? "bg-[#1e293b]" : "bg-[#ffffff]"
        }`}
      >
        {/* LEFT LOGIN SECTION */}
        <div className="flex items-center justify-center px-7 py-12 sm:px-12 md:px-10 lg:px-[60px]">
          <div className="w-full max-w-[390px]">

            {/* Heading */}
            <div className="mb-6">
              <h1
                className={`text-[21px] font-bold tracking-tight ${
                  dark ? "text-white" : "text-[#172033]"
                }`}
              >
                Welcome back
              </h1>

              <p
                className={`mt-1 text-[13px] ${
                  dark ? "text-gray-400" : "text-[#647996]"
                }`}
              >
                Sign in to your clinic workspace
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email */}
              <div>
                <label
                  className={`mb-1 block text-[11px] font-bold tracking-wide ${
                    dark ? "text-gray-300" : "text-[#53647f]"
                  }`}
                >
                  EMAIL ADDRESS
                </label>

                <input
                  type="email"
                  placeholder="dr.smith@vetclinic.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`h-[47px] w-full rounded-xl border px-4 text-sm outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${
                    dark
                      ? "border-gray-600 bg-[#273449] text-white placeholder:text-gray-500"
                      : "border-[#cbd5e1] bg-white text-[#172033] placeholder:text-[#94a8c5] shadow-sm"
                  }`}
                />

                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  className={`mb-1 block text-[11px] font-bold tracking-wide ${
                    dark ? "text-gray-300" : "text-[#53647f]"
                  }`}
                >
                  PASSWORD
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`h-[47px] w-full rounded-xl border px-4 pr-12 text-sm outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${
                      dark
                        ? "border-gray-600 bg-[#273449] text-white placeholder:text-gray-500"
                        : "border-[#cbd5e1] bg-white text-[#172033] placeholder:text-[#94a8c5] shadow-sm"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                      dark ? "text-gray-400" : "text-[#8095b3]"
                    }`}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* API Error */}
              {error && (
                <div className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-[44px] w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#009f91] to-[#0099bd] text-sm font-bold text-white shadow-lg shadow-teal-500/20 transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in to Workspace"}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>

            {/* Divider */}
            <div
              className={`my-4 border-t ${
                dark ? "border-gray-700" : "border-[#dce5ee]"
              }`}
            />

            {/* Register Link */}
            <p
              className={`text-center text-[12px] ${
                dark ? "text-gray-400" : "text-[#52647e]"
              }`}
            >
              Don't have a clinic account?{" "}
              <a
                href="/register"
                className="font-bold text-[#009f91] hover:underline"
              >
                Create one now →
              </a>
            </p>
          </div>
        </div>

        {/* RIGHT INFORMATION PANEL */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#117c76] to-[#087b96] px-7 py-8 sm:px-10 md:px-8 lg:px-8">

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full border border-white/10" />

          {/* Brand Header */}
          <div className="relative z-10 flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/25 bg-white/10">
                <Heart size={18} className="text-white" />
              </div>

              <h2 className="text-[16px] font-bold tracking-tight text-white">
                VetScribe<span className="text-teal-200">AI</span>
              </h2>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>

          {/* Main Content */}
          <div className="relative z-10 mt-8 md:mt-0">

            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#54e7cb]" />
              <span className="text-[11px] font-semibold text-white">
                AI Clinical Engine
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[24px] font-bold leading-tight tracking-tight text-white sm:text-[26px]">
              Clinical notes,{" "}
              <span className="text-[#8ce9dc]">
                reimagined.
              </span>
            </h1>

            <p className="mt-4 max-w-[390px] text-[12px] font-medium leading-[21px] text-white/85">
              Focus 100% on patient care during consultations while AI
              transcribes and formats your SOAP notes.
            </p>

            {/* Feature Cards */}
            <div className="mt-5 space-y-2.5">

              {/* Feature 1 */}
              <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-2.5 transition hover:bg-white/15">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <Mic size={19} className="text-white" />
                </div>

                <div>
                  <h3 className="text-[12px] font-bold text-white">
                    AI Voice Transcription
                  </h3>
                  <p className="text-[11px] text-white/65">
                    Real-time audio to structured SOAP
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-2.5 transition hover:bg-white/15">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <ClipboardList size={19} className="text-white" />
                </div>

                <div>
                  <h3 className="text-[12px] font-bold text-white">
                    Auto SOAP Generation
                  </h3>
                  <p className="text-[11px] text-white/65">
                    Structured clinical notes in seconds
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-2.5 transition hover:bg-white/15">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <Lightbulb size={19} className="text-white" />
                </div>

                <div>
                  <h3 className="text-[12px] font-bold text-white">
                    AI Clinical Suggestions
                  </h3>
                  <p className="text-[11px] text-white/65">
                    Context-aware diagnostic insights
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 mt-8 border-t border-white/20 pt-4">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium text-white/65">
              <ShieldCheck size={14} className="text-[#59e5cb]" />
              <span>HIPAA-compliant</span>
              <span>·</span>
              <span>End-to-end encrypted</span>
              <span>·</span>
              <span>SOC 2 Type II</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
