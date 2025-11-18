import { Link, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu as AntMenu } from "antd";
import { useState } from "react";
import tokenService from "../services/token.service";

const { Header } = Layout;

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = tokenService.LoggedIn();
  const isHomePage = location.pathname === '/';
  
  const logout = () => {
    tokenService.removeToken();
    navigate("/login");
  };
  const publicLinks = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "About", path: "/about" },
    { id: 6, title: "Setup Business", path: "/cal" },
    { id: 7, title: "Contact Us", path: "/contact" },

  ];
  const privateLinks = [
    { id: 5, title: "Requests", path: "/requests" },
  ];
  const Links = isLoggedIn ? [...publicLinks, ...privateLinks] : [...publicLinks];
  // Build Ant Design Menu items array
  const menuItems = [
    ...Links.map((d) => ({
      key: d.id,
      label: (
        <Link to={d.path} className="nav-link px-2" style={{ color: isHomePage ? "white" : "#222", textDecoration: "none" }}>
          {d.title}
        </Link>
      ),
    })),
    !isLoggedIn
      ? {
          key: "login",
          label: (
            <Link to="/login" className="nav-link px-2" style={{ color: isHomePage ? "white" : "#222", textDecoration: "none" }}>
              Login
            </Link>
          ),
        }
      : {
          key: "logout",
          label: (
            <Link to="/" className="nav-link px-2" style={{ color: isHomePage ? "white" : "#222", textDecoration: "none" }} onClick={logout}>
              logout
            </Link>
          ),
        },
  ];

  return (
    <Header style={{ 
      background: isHomePage ? "transparent" : "#fff", 
      padding: 0, 
      position: isHomePage ? "absolute" : "relative", 
      top: isHomePage ? 0 : "auto", 
      left: isHomePage ? 0 : "auto", 
      right: isHomePage ? 0 : "auto", 
      zIndex: isHomePage ? 1000 : "auto", 
      marginBottom: isHomePage ? 0 : 24 
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <Link to="/" className="fw-bold" style={{ fontSize: 24, color: isHomePage ? "white" : "#222", textDecoration: "none" }}>
           BUSINESS HUB
        </Link>
        <AntMenu
          mode="horizontal"
          selectedKeys={[]}
          style={{ 
            borderBottom: "none", 
            flex: 1, 
            minWidth: 0, 
            background: "transparent",
            color: isHomePage ? "white" : "#222"
          }}
          items={menuItems}
        />
      </div>
    </Header>
  );
};

export default Menu;
