import React, { useState, useEffect } from "react";
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

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CreatePoste() {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTitle(value);
  };
  const handleChangeImage = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image && title) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image, image.name);
      try {
        const response = await api.post("/poste", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status == 201) {
          navigate("/dashboard/poste");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" sx={{ mt: 3, mb: 2 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <TextField
                autoComplete="title"
                name="title"
                required
                fullWidth
                id="title"
                label="Tittre"
                value={title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                required
                type="file"
                fullWidth
                id="image"
                label="image"
                onChange={handleChangeImage}
              />
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ajouter
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
