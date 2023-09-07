import React, { useEffect, useState } from "react";
import "./navigation.scss";
import { Menu, ClickAwayListener } from "@mui/material";
import {
  AddCircle,
  Category,
  Event,
  Group,
  GroupAdd,
  History,
  Inventory,
  PeopleOutline,
  PersonPin,
  ReportProblem,
  ShoppingCart,
  StackedBarChart,
  TableRestaurant,
} from "@mui/icons-material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import SendIcon from "@mui/icons-material/Send";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
export default function HomeScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openBar, setOpenBar] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openProduits, setOpenProduits] = useState(false);
  const [openEvents, setOpenEvents] = useState(false);
  const handleClickProduits = () => {
    setOpenProduits(!openProduits);
  };
  const [openStock, setOpenStock] = useState(false);
  const handleClickEvents = () => {
    setOpenEvents(!openEvents);
  };
  const handleClickStock = () => {
    setOpenStock(!openStock);
  };
  const [openUsers, setOpenUsers] = useState(false);
  const handleClickUsers = () => {
    setOpenUsers(!openUsers);
  };
  const [openTables, setOpenTables] = useState(false);
  const handleClickTables = () => {
    setOpenTables(!openTables);
  };

  const [openStatistiques, setOpenStatistiques] = useState(false);
  const handleClickStatistiques = () => {
    setOpenStatistiques(!openStatistiques);
  };
  const open = Boolean(anchorEl);

  const handleClose = () => {
    if (anchorEl) setAnchorEl(null);
  };
  const [openCategories, setOpenCategories] = useState(false);
  const handleClickCategories = () => {
    setOpenCategories(!openCategories);
  };

  const paths = {
    dashboard: "/dashboard",
    historiqueCommandes: "/dashboard/historiqueCommandes",
    ajoutCommandes: "/dashboard/AjoutCommandes",
    historiquereclammations: "/dashboard/historiquereclammations",
    ajoutreclammations: "/dashboard/Ajoutreclammations",
    utilisateurs: "/dashboard/utilisateurs",
    addutilisateurs: "/dashboard/ajoututilisateurs",
    categories: "/dashboard/categories",
    ajoutcategories: "/dashboard/ajoutcategories",
    produits: "/dashboard/produits",
    ajoutproduits: "/dashboard/ajoutproduits",
    stock: "/dashboard/stock",
    ajoutstock: "/dashboard/ajoutstock",
    tables: "/dashboard/tables",
    ajouttables: "/dashboard/ajouttables",
    roles: "/dashboard/roles",
    ajoutroles: "/dashboard/ajoutroles",
    statistiquesEmployes: "/dashboard/statistiquesEmployes",
    statistiquesCommandes: "/dashboard/statistiquesCommandes",
  };
  if (loading) {
    return <div className="homescreen-container">Loading...</div>;
  }
  return (
    <div className="homescreen-container">
      <div
        className="arrowClose"
        onClick={() => {
          setOpenBar(false);
        }}
        style={openBar ? {} : { display: "none" }}
      >
        <ArrowBackIcon fontSize="48px" />
      </div>
      <div
        className="arrowOpen"
        onClick={() => {
          setOpenBar(true);
        }}
        style={openBar ? { display: "none" } : {}}
      >
        <ArrowForwardIcon fontSize="48px" />
      </div>
      <section
        className="left"
        style={openBar ? { display: "block" } : { display: "none" }}
      >
        <nav>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
          >
            <ListItemButton
              selected={location.pathname === paths.dashboard}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Tableau de board" />
            </ListItemButton>
            <ListItemButton onClick={handleClickCategories}>
              <ListItemIcon>
                <Category />
              </ListItemIcon>
              <ListItemText primary="Projets" />
              {openCategories ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCategories} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  selected={location.pathname === paths.categories}
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate("/dashboard/project");
                  }}
                >
                  <ListItemIcon>
                    <Category />
                  </ListItemIcon>
                  <ListItemText primary="Liste des projets" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={location.pathname === paths.ajoutcategories}
                  onClick={() => {
                    navigate("/dashboard/addproject");
                  }}
                >
                  <ListItemIcon>
                    <AddCircle />
                  </ListItemIcon>
                  <ListItemText primary="Ajouter un projet" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={handleClickProduits}>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText primary="Entretien" />
              {openProduits ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openProduits} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  selected={location.pathname === paths.produits}
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate("/dashboard/interview");
                  }}
                >
                  <ListItemIcon>
                    <ShoppingCart />
                  </ListItemIcon>
                  <ListItemText primary="Liste des entretiens" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={location.pathname === paths.ajoutproduits}
                  onClick={() => {
                    navigate("/dashboard/addInterview");
                  }}
                >
                  <ListItemIcon>
                    <AddCircle />
                  </ListItemIcon>
                  <ListItemText primary="Planifier un entretien" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={handleClickStock}>
              <ListItemIcon>
                <Inventory />
              </ListItemIcon>
              <ListItemText primary="Postes" />
              {openStock ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openStock} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  selected={location.pathname === paths.stock}
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate("/dashboard/poste");
                  }}
                >
                  <ListItemIcon>
                    <Inventory />
                  </ListItemIcon>
                  <ListItemText primary="Les Postes" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={location.pathname === paths.ajoutstock}
                  onClick={() => {
                    navigate("/dashboard/addPoste");
                  }}
                >
                  <ListItemIcon>
                    <AddCircle />
                  </ListItemIcon>
                  <ListItemText primary="Ajouter un poste" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton
              selected={location.pathname === paths.historiquereclammations}
              onClick={() => {
                navigate("/dashboard/complaint");
              }}
            >
              <ListItemIcon>
                <ReportProblem />
              </ListItemIcon>
              <ListItemText primary="Réclamations" />
            </ListItemButton>
            <ListItemButton
              selected={location.pathname === paths.historiquereclammations}
              onClick={() => {
                navigate("/dashboard/leave");
              }}
            >
              <ListItemIcon>
                <ReportProblem />
              </ListItemIcon>
              <ListItemText primary="Congés" />
            </ListItemButton>
            <ListItemButton
              selected={location.pathname === paths.historiqueCommandes}
              onClick={() => {
                navigate("/dashboard/absence");
              }}
            >
              <ListItemIcon>
                <History />
              </ListItemIcon>
              <ListItemText primary="Absences" />
            </ListItemButton>
            <ListItemButton onClick={handleClickUsers}>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Utilisateurs" />
              {openUsers ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openUsers} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  selected={location.pathname === paths.utilisateurs}
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate("/dashboard/user");
                  }}
                >
                  <ListItemIcon>
                    <PeopleOutline />
                  </ListItemIcon>
                  <ListItemText primary="Liste des utilisateurs" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={location.pathname === paths.addutilisateurs}
                  onClick={() => {
                    navigate("/dashboard/user");
                  }}
                >
                  <ListItemIcon>
                    <GroupAdd />
                  </ListItemIcon>
                  <ListItemText primary="Ajouter un utilisateur" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={handleClickTables}>
              <ListItemIcon>
                <TableRestaurant />
              </ListItemIcon>
              <ListItemText primary="Test Techniques" />
              {openTables ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openTables} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  selected={location.pathname === paths.tables}
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate("/dashboard/techtest");
                  }}
                >
                  <ListItemIcon>
                    <TableRestaurant />
                  </ListItemIcon>
                  <ListItemText primary="Liste des Tests" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={location.pathname === paths.ajouttables}
                  onClick={() => {
                    navigate("/dashboard/createQuesRep");
                  }}
                >
                  <ListItemIcon>
                    <AddCircle />
                  </ListItemIcon>
                  <ListItemText primary="Ajouter une question " />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={location.pathname === paths.ajouttables}
                  onClick={() => {
                    navigate("/dashboard/listequesrep");
                  }}
                >
                  <ListItemIcon>
                    <AddCircle />
                  </ListItemIcon>
                  <ListItemText primary="Listes des questions " />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={location.pathname === paths.ajouttables}
                  onClick={() => {
                    navigate("/dashboard/createTechnicalTest");
                  }}
                >
                  <ListItemIcon>
                    <AddCircle />
                  </ListItemIcon>
                  <ListItemText primary="Ajouter un test " />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={handleClickEvents}>
              <ListItemIcon>
                <Event />
              </ListItemIcon>
              <ListItemText primary="Réunion" />
              {openEvents ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openEvents} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  selected={location.pathname === paths.stock}
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate("/dashboard/meeting");
                  }}
                >
                  <ListItemIcon>
                    <Event />
                  </ListItemIcon>
                  <ListItemText primary="Liste des Réunions" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={location.pathname === paths.ajoutstock}
                  onClick={() => {
                    navigate("/dashboard/addMeeting");
                  }}
                >
                  <ListItemIcon>
                    <AddCircle />
                  </ListItemIcon>
                  <ListItemText primary="Ajouter une réunion" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </nav>
        <div
          className="logout"
          onClick={() => {
            window.localStorage.clear();
            navigate("/");
          }}
        >
          Déconnexion
        </div>
      </section>
      <section className="right">
        <Outlet />
      </section>
    </div>
  );
}
