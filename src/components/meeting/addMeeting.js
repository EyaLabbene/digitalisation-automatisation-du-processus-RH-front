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

export default function CreateMeeting() {
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const response = await api.get(`/user/employee`);
    console.log(response.data);
    setListEmployee(response.data);
  }
  const theme = useTheme();
  const [employee, setEmployee] = useState([]);
  const [listEmpolyee, setListEmployee] = useState([]);
  useEffect(() => {
    console.log(employee);
  }, [employee]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setEmployee(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeDate = (event) => {
    const {
      target: { value },
    } = event;
    setdate(value);
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
  const [date, setdate] = useState("");
  const [start_time, setStart] = useState("");
  const [end_time, setEnd] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/meeting", {
        employee,
        date,
        start_time,
        end_time,
      });

      navigate("/dashboard/meeting");
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
            Planifier une nouvelle réunions
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <div>Le</div>
              <TextField
                autoComplete="date"
                name="date"
                required
                fullWidth
                type="date"
                id="date"
                value={date}
                onChange={handleChangeDate}
              />
            </Grid>
            <Grid item xs={12}>
              <div>De</div>
              <TextField
                autoComplete="start_time"
                name="start_time"
                required
                fullWidth
                type="datetime-local"
                id="start_time"
                value={start_time}
                onChange={handleChangeStart}
              />
            </Grid>
            <Grid item xs={12}>
              <div>jusqu'à</div>
              <TextField
                autoComplete="end_time"
                name="end_time"
                required
                fullWidth
                type="datetime-local"
                id="end_time"
                value={end_time}
                onChange={handleChangeEnd}
              />
            </Grid>

            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="multiselectEmployeeLabel">Employés</InputLabel>
                <Select
                  labelId="multiselectEmployeeLabel"
                  id="multiselectEmployee"
                  multiple
                  fullWidth
                  value={employee}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {listEmpolyee.map((user) => (
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
