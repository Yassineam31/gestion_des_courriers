import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Inscription from "./components/Inscription";
import CourrierEntrant from "./pages/CourrierEntrant";
import CourrierSortant from "./pages/CourrierSortant";
import Membres from "./pages/Membres";
import Archive from "./pages/Archive";
import Rechercher from "./pages/Rechercher";
import Notifications from "./pages/Notifications";
import "./styles/sideBar.css";
import './styles//inscription.css';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inscription" element={<Inscription/>} />
        <Route path="/*" element={<ProtectedRoutes />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoutes() {
  return (
    <div >
      <Sidebar>
        <Routes>
          <Route path="/courrierEntrant" element={<CourrierEntrant/>} />
          <Route path="/Notifications" element={<Notifications/>} />
          <Route path="/courrierSortant" element={<CourrierSortant/>} />
          <Route path="/membres" element={<Membres/>} />
          <Route path="/archive" element={<Archive/>} />
          <Route path="/rechercher" element={<Rechercher/>} />
        </Routes>
      </Sidebar>
    </div>
  );
}

export default App;
