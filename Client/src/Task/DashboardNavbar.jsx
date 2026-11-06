import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, LogIn, UserPlus } from "lucide-react";

const DashboardNavbar = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const updateAuth = () => {
      setToken(localStorage.getItem("token"));
      setUser(
        JSON.parse(localStorage.getItem("user") || "null")
      );
    };

    window.addEventListener("authChanged", updateAuth);

    return () => {
      window.removeEventListener("authChanged", updateAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setShowProfile(false);

    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <h1
          onClick={() => navigate(token ? "/dashboard" : "/login")}
          className="text-2xl font-bold text-blue-700 cursor-pointer"
        >
          VetScribeAI
        </h1>

        {/* Guest Buttons */}
        {!token ? (
          <div className="flex items-center gap-3">

            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
            >
              <LogIn size={18} />
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <UserPlus size={18} />
              Create Account
            </button>

          </div>
        ) : (

          /* Logged In User */
          <div className="relative">

            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <User size={22} />
              <span className="font-medium">
                {user?.fullName || user?.username || "My Account"}
              </span>
            </button>

            {showProfile && (
              <div className="absolute right-0 top-14 w-64 bg-white shadow-xl border rounded-xl p-4 z-50">

                <h3 className="font-bold text-gray-800">
                  {user?.fullName || user?.username || "User"}
                </h3>

                <p className="text-sm text-gray-500 mt-1 break-all">
                  {user?.email || "No email available"}
                </p>

                <hr className="my-3" />

                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/dashboard");
                  }}
                  className="w-full text-left py-2 hover:text-blue-600"
                >
                  <User size={17} className="inline mr-2" />
                  My Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <LogOut size={17} className="inline mr-2" />
                  Logout
                </button>

              </div>
            )}

          </div>
        )}

      </div>
    </nav>
  );
};

export default DashboardNavbar;