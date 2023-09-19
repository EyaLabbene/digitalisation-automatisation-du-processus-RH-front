import { api } from "../../api";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

export default function PosteForm() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const myPostId = location.state?.postId;
  const myPostName = location.state?.postName;
  const handleChangeImage = (event) => {
    setImage(event.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("poste", myPostId);
      formData.append("image", image, image.name);
      try {
        const response = await api.post("/candidacy", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status == 201) {
          navigate("/dashboardCandidate/posteCandidate");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("empty error to handle");
    }
  };
  return (
    <Container component="main" sx={{ mt: 3, mb: 2 }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Candidature pour le poste {myPostName}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <label>Insérer votre cv</label>
            <Input
              required
              type="file"
              fullWidth
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
            Postuler
          </Button>
        </form>
      </Box>
    </Container>
  );
}
