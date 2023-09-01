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

export default function CreateInterview() {
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const response = await api.get(`/user`);
    console.log(response.data);
    setListUser(response.data);
  }
  const theme = useTheme();
  const [interviewer, setInterviewer] = useState([]);
  const [interviewee, setInterviewee] = useState([]);
  const [listUser, setListUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(interviewer);
  }, [interviewer]);
  useEffect(() => {
    console.log(interviewee);
  }, [interviewee]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterviewer(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeInterviewee = (event) => {
    const {
      target: { value },
    } = event;
    setInterviewee(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeStart = (event) => {
    const {
      target: { value },
    } = event;
    setStart(value);
  };
  const handleChangeEnd = (event) => {
    const {
      target: { value },
    } = event;
    setEnd(value);
  };
  const [start_date, setStart] = useState("");
  const [end_date, setEnd] = useState("");
  const fetchUser = async () => {
    let data = null; // Initialisation de la variable data

    try {
      const response = await fetch("/user");
      data = await response.json();
      console.log(data); // Vérifiez la structure de la réponse dans la console
    } catch (error) {
      console.error("Erreur lors de la récupération des employés :", error);
    }

    setListUser(data);
    fetchUser();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/interview", {
        interviewer,
        interviewee,
        start_date,
        end_date,
      });

      navigate("/dashboard/interview");
    } catch (error) {
      console.error(error);
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
              <div>De</div>
              <TextField
                autoComplete="start_date"
                name="start_date"
                required
                fullWidth
                type="datetime-local"
                id="start_date"
                // label="De"
                value={start_date}
                onChange={handleChangeStart}
              />
            </Grid>
            <Grid item xs={12}>
              <div>jusqu'à</div>

              <TextField
                fullWidth
                autoComplete="end_date"
                name="end_date"
                required
                type="datetime-local"
                id="end_date"
                // label="jusqu à"
                value={end_date}
                onChange={handleChangeEnd}
              />
            </Grid>
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="multiselectUserLabel">Recruteur</InputLabel>
                <Select
                  labelId="multiselectUserLabel"
                  id="multiselectUser"
                  fullWidth
                  value={interviewer}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {listUser.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.first_name + " " + user.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="multiselectUserLabel">Candidat</InputLabel>
                <Select
                  labelId="multiselectUserLabel"
                  id="multiselectUser"
                  value={interviewee}
                  onChange={handleChangeInterviewee}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {listUser.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.first_name + " " + user.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
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
