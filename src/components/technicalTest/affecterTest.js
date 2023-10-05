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
import ListesQuesRep from "./listesQuestRep";
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

export default function AffectertechnicalTest() {
  const theme = useTheme();
  const [techTest, setTechTest] = useState([]);
  const [listTests, setListTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(techTest);
  }, [techTest]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTechTest(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeUserTestee = (event) => {
    const {
      target: { value },
    } = event;
    setUserTestee(value);
  };
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const responseUser = await api.get(`/user/candidate`);
    console.log(responseUser.data);
    setListCandidat(responseUser.data);
    const responseTest = await api.get(`/techTest`);
    console.log(responseTest.data);
    setListTests(responseTest.data);
  }
  const [listCandidat, setListCandidat] = useState([]);

  const [userTestee, setUserTestee] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/userTest", {
        techTest,
        userTestee,
      });
      navigate("/dashboard/AfficherResultat");
      console.log(response.data);
      console.log("succes");

      // window.localStorage.setItem("token", "bearer " + response.data.token);

      console.log(response.data);
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
            Affecter un test à un candidat
          </Typography>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="multiselectTestsLabel">Tests</InputLabel>
                <Select
                  labelId="multiselectTestsLabel"
                  id="multiselectTests"
                  value={techTest}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {listTests.map((test) => (
                    <MenuItem key={test._id} value={test._id}>
                      {test.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="multiselectCandidatLabel">Candidats</InputLabel>
                <Select
                  labelId="multiselectCandidatsLabel"
                  id="multiselectCandidat"
                  value={userTestee}
                  onChange={handleChangeUserTestee}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {listCandidat.map((user) => (
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
