import { NavLink } from "react-router-dom";

function Navbar() {
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-slate-950 text-white px-6 md:px-16 py-5 flex justify-between items-center shadow-lg">
      <NavLink to="/" className="text-2xl font-bold">
        <span className="text-blue-500">Web</span>Studio.
      </NavLink>

      <div className="flex gap-5 md:gap-8 items-center">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `text-sm md:text-base transition ${
                isActive
                  ? "text-blue-400 font-bold"
                  : "text-gray-300 hover:text-blue-400"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;