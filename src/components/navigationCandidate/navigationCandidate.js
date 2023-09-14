import React, { useEffect, useState } from "react";
import "./navigationCandidate.scss";
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
export default function HomeScreenCandidate() {
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
                    navigate("/dashboardCandidate/posteCandidate");
                  }}
                >
                  <ListItemIcon>
                    <Inventory />
                  </ListItemIcon>
                  <ListItemText primary="Les Postes" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={handleClickStock}>
              <ListItemIcon>
                <Inventory />
              </ListItemIcon>
              <ListItemText primary="Entretiens" />
              {openStock ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openStock} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  selected={location.pathname === paths.stock}
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate("/dashboardCandidate/EntretienCandidate");
                  }}
                >
                  <ListItemIcon>
                    <Inventory />
                  </ListItemIcon>
                  <ListItemText primary="Les Entretiens" />
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
                    navigate("/dashboardCandidate/passTest");
                  }}
                >
                  <ListItemIcon>
                    <TableRestaurant />
                  </ListItemIcon>
                  <ListItemText primary="Liste des Tests" />
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
