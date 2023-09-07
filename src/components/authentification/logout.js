import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Logout() {
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  return (
    <AppBar>
      <Toolbar>
        <Button color="inherit">Login</Button>
        <Button onClick={logout} color="inherit">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
