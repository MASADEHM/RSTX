import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu as AntMenu } from "antd";
import { useState } from "react";
import tokenService from "../services/token.service";

const { Header } = Layout;

const Menu = () => {
  const navigate = useNavigate();
  const isLoggedIn = tokenService.LoggedIn();
  
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
        <Link to={d.path} className="nav-link px-2 link-secondary" >
          {d.title}
        </Link>
      ),
    })),
    !isLoggedIn
      ? {
          key: "login",
          label: (
            <Link to="/login" className="nav-link px-2 link-secondary" >
              Login
            </Link>
          ),
        }
      : {
          key: "logout",
          label: (
            <Link to="/" className="nav-link px-2 link-secondary" onClick={logout}>
              logout
            </Link>
          ),
        },
  ];

  return (
    <Header style={{ background: "#fff", padding: 0, marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1200, margin: "0 auto" }}>
        <Link to="/" className="fw-bold" style={{ fontSize: 24, color: "#222", textDecoration: "none" }}>
           BUSINESS HUB
        </Link>
        <AntMenu
          mode="horizontal"
          selectedKeys={[]}
          style={{ borderBottom: "none", flex: 1, minWidth: 0 }}
          items={menuItems}
        />
      </div>
    </Header>
  );
};

export default Menu;
