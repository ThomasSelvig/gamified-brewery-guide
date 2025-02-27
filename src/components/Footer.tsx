import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center text-sm">
        <p>BrewMaster - Learn brewing through play</p>
        <p className="mt-1 text-gray-400">
          Made with ❤️ for beer enthusiasts by Thomas Selvig
        </p>
      </div>
    </footer>
  );
};

export default Footer;