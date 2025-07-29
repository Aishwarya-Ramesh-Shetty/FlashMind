import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#268740] text-white flex justify-between items-center px-6 py-6 shadow-lg">
      <Link to="/" className="text-2xl font-bold">
        FlashMind
      </Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-lg">Welcome, {user.name}!</span>
            <button
              onClick={logout}
              className="bg-white text-[#268740] px-4 py-1 rounded font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className=" ml-20 border-2 text-[#FFFF] hover:bg-[#1f6a35] font-bold border-[#003d16]  bg-[#8a5a44] px-4 py-2  rounded-lg ">Login</Link>
            <Link to="/signup" className=" ml-20 border-2 text-[#FFFF] font-bold hover:bg-[#1f6a35] border-[#003d16]  bg-[#8a5a44] px-4 py-2  rounded-lg ">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
