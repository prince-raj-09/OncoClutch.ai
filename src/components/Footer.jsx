import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0b132b] text-gray-400 text-center p-4 mt-10">
      &copy; {new Date().getFullYear()} Clutch.AI | All Rights Reserved
    </footer>
  );
};

export default Footer;
