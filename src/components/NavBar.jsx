import React from "react";
import "/src/App.css";

const NavBar = () => {
  const navItems = [
    {
      id: "Home",
      label: "Home",
      onClick: () => alert("Features clicked!"),
    },
    {
      id: "CheckIn/CheckOut",
      label: "CheckIn/CheckOut",
      onClick: () => alert("About Us clicked!"),
    },
    {
      id: "attendance",
      label: "Attendance",
      onClick: () => alert("Download clicked!"),
    },
    {
      id: "reports",
      label: "Reports",
      onClick: () => alert("Contact clicked!"),
    },
    {
      id: "sign-up-button",
      label: "Sign in",
      onClick: () => alert("Sign in clicked!"),
    },
  ];

  const logoText = "QuestTrak";
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <img src="./src/assets/small-chapel-logo.png" alt="Nairobi Chapel logo" />
        <h3 id="logo-text">{logoText}</h3>
        <div className="navbar-section" id="navbarNav">
          <ul className="navbar-nav">
            {navItems.map((item, index) => (
              <button
                key={index}
                type="button"
                className="nav-item"
                id={item.id}
                onClick={item.onClick} // Optional: Add onClick handler if needed
              >
                {item.label}
              </button>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
