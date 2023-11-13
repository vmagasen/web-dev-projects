import React from "react";

function Footer() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  return (
    <footer className="footer">
      <p>Copyright {currentYear}</p>
    </footer>
  );
}

export default Footer;
