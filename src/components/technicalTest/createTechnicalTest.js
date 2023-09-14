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

export default function CreatetechnicalTest() {
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const response = await api.get(`/questionResponse`);
    console.log(response.data);
    setListQuestions(response.data);
  }
  const theme = useTheme();
  const [questions, setQuestions] = useState([]);
  const [listQuestions, setListQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(questions);
  }, [questions]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setQuestions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeTitle = (event) => {
    const {
      target: { value },
    } = event;
    setTitle(value);
  };
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/techTest", {
        questions,
        title,
      });
      navigate("/dashboard/techtest");
      console.log(response.data);

      setTitle("");
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
                onChange={handleChangeTitle}
              />
            </Grid>
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="multiselectQuestionsLabel">
                  Questions
                </InputLabel>
                <Select
                  labelId="multiselectQuestionsLabel"
                  id="multiselectQuestions"
                  multiple
                  value={questions}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {listQuestions.map((question) => (
                    <MenuItem key={question._id} value={question._id}>
                      {question.question}
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
