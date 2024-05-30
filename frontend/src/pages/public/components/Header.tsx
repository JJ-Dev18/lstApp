import { Button } from "@chakra-ui/react";

const Header = () => {
  return (
    <header
      className="text-center py-12 md:py-24 bg-cover bg-center"
      style={{
        backgroundImage: "url('/ultimate-frisbee.jpg')",
      }}
    >
      <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Live Score Tracking</h2>
      <p className="text-lg md:text-xl mb-6">
        The best way to track your Ultimate Frisbee games, tournaments, and leagues in real-time.
      </p>
      <Button className="bg-[#22d3ee] text-lg">Start tracking now</Button>
    </header>
  );
};

export default Header;
