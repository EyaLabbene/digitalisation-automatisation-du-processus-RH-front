import React, { useState, useEffect } from "react";
import { api, setAuthToken } from "../../api";
import { useNavigate } from "react-router-dom";
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
import logo from "../../assets/FINAALLRR.png";
import "./signup.scss";
import leftImage from "../../assets/img2.png";

const theme = createTheme();

export default function SignUp() {
  const [first_name, setFirst] = useState("");
  const [last_name, setLast] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [date_of_birth, setDateofbirth] = useState("");

  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/user", {
        first_name,
        last_name,
        email,
        password,
        role: "candidate",
        address,
        date_of_birth,
        Username,
      });

      console.log(response.data);
      setFirst("");
      setLast("");
      setPassword("");
      setRole("");
      setAddress("");
      setDateofbirth("");
      setEmail("");
      setUsername("");

      // window.localStorage.setItem("token", "bearer " + response.data.token);
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sign-up">
      <div className="left-side">
        <img src={leftImage} alt="leftImage" className="leftImage" />
      </div>
      <div className="right-side">
        <div className="top-side">
          <img src={logo} alt="logo" className="logo" />
          <div className="title">Sign-up</div>
        </div>

        <form onSubmit={handleSubmit}>
          <TextField
            className="firstname"
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            variant="standard"
            autoComplete="given-name"
            name="first_name"
            required
            id="first_name"
            label="Prénom"
            onChange={(e) => setFirst(e.target.value)}
            autoFocus
          />

          <TextField
            className="lastname"
            required
            variant="standard"
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            id="last_name"
            label="Nom"
            name="last_name"
            autoComplete="family-name"
            onChange={(e) => setLast(e.target.value)}
          />

          <TextField
            className="email"
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            required
            id="email"
            label="Email"
            variant="standard"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            className="password"
            required
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            name="password"
            label="Mot De Passe"
            type="password"
            id="password"
            variant="standard"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            className="address"
            variant="standard"
            required
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            name="address"
            label="Address"
            id="address"
            autoComplete="address"
            onChange={(e) => setAddress(e.target.value)}
          />

          <TextField
            className="date"
            variant="standard"
            required
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            name="date_of_birth"
            label="Date De Naissance"
            type="date"
            id="date_of_birth"
            autoComplete=" date_of_birth"
            onChange={(e) => setDateofbirth(e.target.value)}
          />

          <TextField
            className="username"
            variant="standard"
            required
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            name="Username"
            label="Nom D'utilisateur"
            id="Username"
            autoComplete="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <Button type="submit" className="submitButton" variant="contained">
            Créer un compte
          </Button>

          <Button
            className="link"
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an account? Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
