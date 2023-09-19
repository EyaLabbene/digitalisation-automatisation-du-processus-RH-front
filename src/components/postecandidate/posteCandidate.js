import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { Card, Box, LinearProgress, styled, Button } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridOverlay,
} from "@mui/x-data-grid";
import { Visibility } from "@mui/icons-material";

import "./posteCandidate.scss";

function PosteCandidate({ match }) {
  const [loading, setLoading] = useState(false);
  const [dataRows, setDataRows] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/poste`);
      console.log(response.data);
      setDataRows(response.data);
    };

    fetchData();
  }, [match]);

  return (
    <div className="postesCandidateScreen ">
      <header>Postes</header>
      <main>
        <Card sx={{ flex: 1 }} className="postesCandidate-container">
          {dataRows.map((element, key) => (
            <Card className="posteCandidate" key={key}>
              <div className="postetitle">{element.title}</div>
              <div className="posteimage">
                <img
                  alt="image du poste"
                  src={"data:image/jpeg;base64," + element.image}
                />
              </div>
              <Button
                className="postuler"
                color="primary"
                onClick={() => {
                  navigate("/dashboardCandidate/PosteForm", {
                    state: {
                      postId: element._id,
                      postName: element.title,
                    },
                  });
                }}
              >
                Postuler
              </Button>
            </Card>
          ))}
        </Card>
      </main>
    </div>
  );
}

export default PosteCandidate;
