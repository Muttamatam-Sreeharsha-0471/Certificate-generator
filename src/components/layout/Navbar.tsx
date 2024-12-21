import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xl font-semibold text-gray-900">GDG SIMATS</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" active={location.pathname === "/"}>
              Home
            </NavLink>
            <NavLink to="/single" active={location.pathname === "/single"}>
              Single Certificate
            </NavLink>
            <NavLink to="/bulk" active={location.pathname === "/bulk"}>
              Bulk Generation
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active: boolean }) => (
  <Link
    to={to}
    className={`${
      active
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-600 hover:text-blue-600'
    } px-3 py-2 text-sm font-medium transition-colors duration-200`}
  >
    {children}
  </Link>
);

export default Navbar;