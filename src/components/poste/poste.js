import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

import {
  Card,
  Box,
  LinearProgress,
  styled,
  Button,
  Input,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridOverlay,
} from "@mui/x-data-grid";
import { Visibility } from "@mui/icons-material";

import "./poste.scss";

function Poste({ match }) {
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [dataRows, setDataRows] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPoste, setSelectedPoste] = useState(null);
  const [newImage, setNewImage] = useState(null);
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
  const handleEditPoste = (poste) => {
    setSelectedPoste(poste);
    setUpdateModalOpen(true);
  };

  const handleDeletePoste = (poste) => {
    setSelectedPoste(poste);
    setDeleteModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedPoste(null);
    setNewImage(null);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedPoste(null);
  };

  const handleUpdatePoste = async () => {
    try {
      if (selectedPoste) {
        const formData = new FormData();
        formData.append("title", selectedPoste.title);
        if (newImage !== null) {
          formData.append("image", newImage, newImage.name);
        }

        const response = await api.put(
          `/poste/${selectedPoste._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          setDataRows((prevState) => {
            const updatedRows = prevState.map((row) =>
              row._id === selectedPoste._id ? response.data : row
            );
            return updatedRows;
          });
          console.log("Poste updated successfully:", response.data);
        } else {
          console.error("Error updating poste:", response.data);
        }
      }
    } catch (error) {
      console.error("An error occurred while updating poste:", error);
    }
    handleCloseUpdateModal();
  };

  const handleDeletePosteConfirmed = async () => {
    try {
      if (selectedPoste) {
        const response = await api.delete(`/poste/${selectedPoste._id}`);

        if (response.status === 200) {
          setDataRows((prevState) =>
            prevState.filter((row) => row._id !== selectedPoste._id)
          );
          console.log("Poste deleted successfully:", response.data);
        } else {
          console.error("Error deleting poste:", response.data);
        }
      }
    } catch (error) {
      console.error("An error occurred while deleting poste:", error);
    }
    handleCloseDeleteModal();
  };

  const handleFieldChange = (fieldName, value) => {
    setSelectedPoste({
      ...selectedPoste,
      [fieldName]: value,
    });
  };
  const handleChangeImage = (event) => {
    setNewImage(event.target.files[0]);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/poste`);
      console.log(response.data);
      setDataRows(response.data);
    };

    fetchData();
  }, [match]);

  const dataColumns = [
    {
      field: "title",
      headerName: "Tittre",
      minWidth: 400,
      flex: 1,
    },
    {
      field: "image",
      headerName: "image",
      minWidth: 400,
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <img
            alt="image du poste"
            src={"data:image/jpeg;base64," + params.value}
          />
        ) : (
          <></>
        ),
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
            onClick={() => handleEditPoste(params.row)}
          >
            Edit
          </Button>
          <Button
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeletePoste(params.row)}
          >
            Delete
          </Button>
        </div>
      ),
    },
    ,
  ];

  return (
    <div className="postesScreen">
      <header>Postes</header>
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
              NoRowsOverlay: () => CustomNoRowsOverlay("Pas de postes"),
              NoResultsOverlay: () => CustomNoRowsOverlay("Pas de Résultats"),
            }}
            disableSelectionOnClick
            onSelectionModelChange={(selection) => {
              if (selection.selectionModel.length > 0) {
                const selectedRowIndex = selection.selectionModel[0];
                const poste = dataRows[selectedRowIndex];
                setSelectedPoste(poste);
              } else {
                setSelectedPoste(null);
              }
            }}
          />
        </Card>
      </main>
      {/* Update  Modal */}
      <Dialog open={updateModalOpen} onClose={handleCloseUpdateModal}>
        <DialogTitle>Modifier le Poste</DialogTitle>
        <DialogContent>
          {selectedPoste && (
            <form>
              <TextField
                fullWidth
                label="Tittre"
                variant="outlined"
                margin="normal"
                value={selectedPoste.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  alt="image du poste"
                  width={400}
                  src={
                    newImage
                      ? URL.createObjectURL(newImage)
                      : "data:image/jpeg;base64," + selectedPoste.image
                  }
                />
              </div>
              <Input
                required
                type="file"
                fullWidth
                id="image"
                label="image"
                onChange={handleChangeImage}
              />
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateModal} color="primary">
            Annuler
          </Button>
          <Button onClick={handleUpdatePoste} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Modal   */}
      <Dialog open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <DialogTitle>Delete Poste</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Voulez Vous Supprimer le poste : ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeletePosteConfirmed} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Poste;
