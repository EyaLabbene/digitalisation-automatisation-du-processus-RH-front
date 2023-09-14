import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../../api";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Iframe from "react-iframe";
import styled from "styled-components";
import logo from "../../assets/FINAALLRR.png";
import leftImage from "../../assets/img1.png";
import "./authentification.scss";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const theme = createTheme();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .post("/authentification", { email, password })
      .then((response) => {
        window.localStorage.setItem("token", response.data.token);
        setAuthToken(response.data.token);
        if (response.data.role === "admin") {
          navigate("/dashboard/user");
        } else {
          console.log("coucou");
          navigate("/dashboardCandidate");
        }

        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="log-in">
      <div className="left-side">
        <img src={leftImage} alt="leftImage" className="leftImage" />
      </div>
      <div className="right-side">
        <div className="top-side">
          <img src={logo} alt="logo" className="logo" />
          <div className="title">Log-In</div>
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            className="email"
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            required
            id="email"
            label="email"
            variant="standard"
            onChange={handleEmailChange}
          />
          <TextField
            className="password"
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            required
            label="Password"
            type="password"
            id="password"
            variant="standard"
            onChange={handlePasswordChange}
          />
          <Button type="submit" className="submitButton" variant="contained">
            Se connecter
          </Button>
          <div className="signUpTextRow">
            <div className="signUpText">Vous n'avez pas de compte?</div>
            <div
              className="signUpButton"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Inscrivez-vous
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
