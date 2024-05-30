import { Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <footer className="py-8 px-8 bg-[#1e293b]">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Link className="hover:text-[#22d3ee]" href="#">
            Privacy Policy
          </Link>
          <Link className="hover:text-[#22d3ee]" href="#">
            Terms of Service
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link className="hover:text-[#22d3ee]" href="#">
            {/* <TwitterIcon className="h-6 w-6" /> */}
          </Link>
          <Link className="hover:text-[#22d3ee]" href="#">
            {/* <FacebookIcon className="h-6 w-6" /> */}
          </Link>
          <Link className="hover:text-[#22d3ee]" href="#">
            {/* <InstagramIcon className="h-6 w-6" /> */}
          </Link>
        </div>
        <p className="text-lg">©2022 Frisbee Live</p>
      </div>
    </footer>
  );
};

export default Footer;
