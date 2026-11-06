import { NavLink, useLocation, Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


// import lightlogo from "@/assets/common/lightlogo.png"
// import collapsenavlogo from "@/assets/common/collapsenavlogo.png";

type NavLinkItem = {
  name: string;
  href: string;
};

const navLinks: NavLinkItem[] = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "SERVICES", href: "/services" },
  { name: "PROJECTS", href: "/projects" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

    const navigate = useNavigate();

  return (
    <nav className="fixed w-full z-[100] px-4 py-3 md:px-10 md:py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-nav px-8 py-2 md:py-3 rounded-none md:rounded-full pointer-events-auto border border-black/5">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
         
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks
            .filter((l) => l.name !== "CAREER")
            .map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `text-red-500 text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 relative group ${
                      isActive
                        ? " text-[#e62117]"
                        : "text-foreground/60 hover:text-foreground"
                    }`
                  }
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] bg-[#e62117] transition-all duration-500 ${
                      location.pathname === link.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </NavLink>
              </motion.div>
            ))}
        </div>

        {/* Action Button */}
        <div className="hidden lg:block">
          <div className="btn-production py-2 scale-75 origin-right hover:cursor-pointer"
         onClick={() => navigate("/contact")}>
            Contact
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-foreground p-2 hover:text-primary transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-white z-[110] flex flex-col p-10 pointer-events-auto"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="self-end text-red-500 border border-red-500 rounded-full"
            >
              <X size={30} />
            </button>
            <div className="-ml-2 mb-12">
            <Link to="/" className="flex items-center gap-1 group">
           
          </Link>
            </div>
            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-bold text-red-500 uppercase tracking-tighter hover:text-black transition-colors"
                >
                  {link.name}
                </NavLink>
                
              ))
              }
            </div>
            <a href="/contact"><p className="text-3xl font-bold text-red-500 uppercase tracking-tighter hover:text-black transition-colors pt-10">CONTACT</p></a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};