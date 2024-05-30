import { Button, Link } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl md:text-3xl font-bold">Frisbee Live</h1>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link className="text-lg hover:text-[#22d3ee]" href="#">
              Tournaments
            </Link>
            <Link className="text-lg hover:text-[#22d3ee]" href="#">
              Teams
            </Link>
            <Link className="text-lg hover:text-[#22d3ee]" href="#">
              Matches
            </Link>
            <Link className="text-lg hover:text-[#22d3ee]" href="#">
              Stats
            </Link>
            <Button className="text-lg" variant="ghost" onClick={() => navigate('/login')}>
              Log In
            </Button>
            <Button className="bg-[#22d3ee] text-lg">Sign Up</Button>
          </div>
        </div>
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <Link className="block py-2 text-lg hover:text-[#22d3ee]" href="#">
            Tournaments
          </Link>
          <Link className="block py-2 text-lg hover:text-[#22d3ee]" href="#">
            Teams
          </Link>
          <Link className="block py-2 text-lg hover:text-[#22d3ee]" href="#">
            Matches
          </Link>
          <Link className="block py-2 text-lg hover:text-[#22d3ee]" href="#">
            Stats
          </Link>
          <Button className="block w-full text-lg py-2 bg-[#22d3ee]" variant="ghost" onClick={() => navigate('/login')}>
            Log In
          </Button>
          <Button className="block w-full text-lg py-2 bg-[#22d3ee] text-white" >
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
);
};
 

export default Navbar;
