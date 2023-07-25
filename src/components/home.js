import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/FINAALLRR.png";
import homeImage from "../assets/img1.png";
import "./home.scss";
export default function ButtonAppBar() {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <div className="navbar">
        <div className="logo">
          <img alt="Element" src={logo} height={150} />
        </div>
        <div className="buttons">
          <Button
            className="overlap-group"
            color="inherit"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
          <Button
            className="overlap"
            color="inherit"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </Button>
        </div>
      </div>
      <div className="callToAction">
        <h1 className="title">WELCOME TO OUR WEBSITE</h1>{" "}
        <img alt="callToActionImage" src={homeImage} />
      </div>
    </div>
  );
}

<div>
  <h1>Welcome to my app!</h1>
  <p>Click on the links above to navigate.</p>
</div>;
