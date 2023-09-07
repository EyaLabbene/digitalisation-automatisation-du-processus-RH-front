import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import {
  Card,
  Box,
  LinearProgress,
  styled,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridOverlay,
} from "@mui/x-data-grid";
import { Visibility } from "@mui/icons-material";
import "./meeting.scss";

function Meeting({ match }) {
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [dataRows, setDataRows] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null); // State for selected meeting
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    start_time: "",
    end_time: "",
    employee: [], // Array of selected employee IDs
  });

  //? MERGED FETCH USER AND MEETING DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await api.get("/user");
        setEmployees(usersResponse.data);

        const meetingsResponse = await api.get("/meeting");
        setDataRows(meetingsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [match]);

  const StyledGridOverlay = styled(GridOverlay)(({ theme }) => ({
    flexDirection: "column",
    "& .ant-empty-img-1": {
      fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
    },
    "& .ant-empty-img-2": {
      fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
    },
    "& .ant-empty-img-3": {
      fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
    },
    "& .ant-empty-img-4": {
      fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
    },
    "& .ant-empty-img-5": {
      fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
      fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
    },
  }));

  function CustomNoRowsOverlay(text) {
    return (
      <StyledGridOverlay>
        <svg
          width="120"
          height="100"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <Box sx={{ mt: 1 }}>{text}</Box>
      </StyledGridOverlay>
    );
  }

  function CustomLoadingOverlay() {
    return (
      <GridOverlay>
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        >
          <LinearProgress />
        </div>
      </GridOverlay>
    );
  }

  const navigate = useNavigate();

  const handleEdit = (meeting) => {
    setSelectedMeeting(meeting);
    setFormData({
      date: new Date(meeting.date).toISOString().split("T")[0],
      start_time: new Date(meeting.start_time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      end_time: new Date(meeting.end_time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      employee: meeting.employee.map((emp) => emp._id),
    });
    setUpdateModalOpen(true);
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleDelete = (meeting) => {
    setSelectedMeeting(meeting);
    setDeleteModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedMeeting(null);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedMeeting(null);
  };

  const handleEditMeeting = async (e) => {
    try {
      e.preventDefault();
      // Parse start_time and end_time into date objects
      const date = new Date(formData.date + "T00:00:00");
      const startTime = new Date(
        formData.date + "T" + formData.start_time + ":00"
      );
      const endTime = new Date(formData.date + "T" + formData.end_time + ":00");

      if (selectedMeeting) {
        const response = await api.put(`/meeting/${selectedMeeting._id}`, {
          ...formData,
          date: date.toISOString(),
          start_time: startTime,
          end_time: endTime,
        });

        if (response.status === 200) {
          setDataRows((prevState) => {
            const updatedRows = prevState.map((row) =>
              row._id === selectedMeeting._id ? response.data : row
            );
            return updatedRows;
          });
          console.log("Meeting updated successfully:", response.data);
        } else {
          console.error("Error updating meeting:", response.data);
        }
      }
    } catch (error) {
      console.error("An error occurred while updating meeting:", error);
    }
    handleCloseUpdateModal();
  };

  const handleDeleteMeeting = async () => {
    try {
      if (selectedMeeting) {
        const response = await api.delete(`/meeting/${selectedMeeting._id}`);
        if (response.status === 200) {
          setDataRows((prevState) =>
            prevState.filter((row) => row._id !== selectedMeeting._id)
          );
          console.log("Meeting deleted successfully:", response.data);
        } else {
          console.error("Error deleting meeting:", response.data);
        }
      }
    } catch (error) {
      console.error("An error occurred while deleting meeting:", error);
    }
    handleCloseDeleteModal(false);
  };

  //? UPDATE FORM
  const populateForm = () => {
    if (selectedMeeting) {
      return (
        <form>
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            margin="normal"
            value={formData.date}
            onChange={(e) => handleFieldChange("date", e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Heure de début"
            type="time"
            variant="outlined"
            margin="normal"
            value={formData.start_time}
            onChange={(e) => handleFieldChange("start_time", e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Heure de fin"
            type="time"
            variant="outlined"
            margin="normal"
            value={formData.end_time}
            onChange={(e) => handleFieldChange("end_time", e.target.value)}
            fullWidth
            required
          />

          {/* Employee Select Field */}
          <FormControl fullWidth>
            <InputLabel>Employée(s)</InputLabel>
            <Select
              multiple
              value={formData.employee}
              onChange={(e) => handleFieldChange("employee", e.target.value)}
              fullWidth
            >
              {/* Map through your existing users and create options */}
              {employees.map((employee) => (
                <MenuItem key={employee._id} value={employee._id}>
                  {employee.Username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      );
    }
  };

  const dataColumns = [
    {
      field: "employee",
      headerName: "Employés",
      minWidth: 400,
      flex: 1,
      renderCell: (params) => (
        <div>
          {params.value.map((element, key) => (
            <span key={key}>
              {element.Username ? element.Username + ", " : "N/A, "}
            </span>
          ))}
        </div>
      ),
    },

    {
      field: "date",
      headerName: "Date",
      minWidth: 200,
      valueFormatter: (params) => {
        const valueFormatted = new Date(params.value).toLocaleDateString(
          "en-GB"
        );
        return valueFormatted;
      },
    },
    {
      field: "start_time",
      headerName: "Commence à :",
      minWidth: 200,
      valueFormatter: (params) => {
        const valueFormatted = new Date(params.value).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return valueFormatted;
      },
    },
    {
      field: "end_time",
      headerName: "se termine à :",
      minWidth: 200,
      valueFormatter: (params) => {
        const valueFormatted = new Date(params.value).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        return valueFormatted;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      minWidth: 200,
      renderCell: (params) => (
        <div className="action-buttons">
          <Button
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="meetingsScreen">
      <header>Réunions</header>
      <main>
        <Card sx={{ flex: 1 }}>
          <DataGrid
            getRowId={(row) => row._id}
            loading={loading}
            columns={dataColumns}
            rows={dataRows}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 20, 30, 50, 100]}
            components={{
              Toolbar: GridToolbar,
              LoadingOverlay: CustomLoadingOverlay,
              NoRowsOverlay: () => CustomNoRowsOverlay("Pas de Réclamations"),
              NoResultsOverlay: () => CustomNoRowsOverlay("Pas de Résultats"),
            }}
            disableSelectionOnClick
            onSelectionModelChange={(selection) => {
              if (selection.selectionModel.length > 0) {
                const selectedRowIndex = selection.selectionModel[0];
                const meeting = dataRows[selectedRowIndex];
                setSelectedMeeting(meeting);
              } else {
                setSelectedMeeting(null);
              }
            }}
          />
        </Card>
      </main>

      {/* UPDATE MODAL */}
      <Dialog open={updateModalOpen} onClose={handleCloseUpdateModal}>
        <DialogTitle>Modifier la Réunion</DialogTitle>
        <DialogContent>{populateForm()}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateModal} color="primary">
            Annuler
          </Button>
          <Button onClick={handleEditMeeting} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>Delete Meeting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedMeeting
              ? ` Do you want to delete the meeting ${selectedMeeting.name}?`
              : "No meeting selected."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteMeeting} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Meeting;
