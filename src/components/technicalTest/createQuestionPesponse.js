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

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function CreateQuestionResponse() {
  const [question, setQuestion] = useState("");
  const [answer_one, setOne] = useState("");
  const [answer_two, setTwo] = useState("");
  const [answer_three, setThree] = useState("");
  const [good_answer, setGood] = useState("");
  const [mark, setMark] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/questionResponse", {
        question,
        answer_one,
        answer_two,
        answer_three,
        good_answer,
        mark,
      });

      console.log(response.data);
      setQuestion("");
      setOne("");
      setTwo("");
      setThree("");
      setGood("");
      setMark("");

      // window.localStorage.setItem("token", "bearer " + response.data.token);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="question"
                  name="question"
                  required
                  fullWidth
                  id="question"
                  label="Question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="answer_one"
                  label="Réponse une"
                  name="answer_one"
                  value={answer_one}
                  autoComplete="answer_one"
                  onChange={(e) => setOne(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="answer_two"
                  label="Deuxième réponse"
                  name="answer_two"
                  autoComplete="answer_two"
                  value={answer_two}
                  onChange={(e) => setTwo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="answer_three"
                  label="troixième réponse"
                  id="answer_three"
                  value={answer_three}
                  onChange={(e) => setThree(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="good_answer"
                  label="bonne réponse"
                  id="good_answer"
                  autoComplete="good_answer"
                  value={good_answer}
                  onChange={(e) => setGood(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="mark"
                  label="note"
                  id="mark"
                  autoComplete="mark"
                  value={mark}
                  onChange={(e) => setMark(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
