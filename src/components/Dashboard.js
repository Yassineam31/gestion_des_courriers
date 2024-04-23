import React from "react";
import { useNavigate } from 'react-router-dom';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { FaInbox, FaRegEnvelope, FaArchive, FaUserFriends, FaSearch, FaBell } from 'react-icons/fa';
import '../styles/dashboardCSS.css';

export default function Dashboard() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', locale: 'ar' };
  const currentDate = new Date().toLocaleDateString('ar', options);
  const navigate = useNavigate(); // Corrected spelling of 'navigate'

  function logoutSubmit() {
    localStorage.setItem("login", "");
    localStorage.setItem("loginStatus", "تم تسجيل الخروج بنجاح!")
    navigate("/"); // Redirecting to the home page
  }

  const user = localStorage.getItem('user');

  return (
    <div className="container d-Flex">
      <div className="d-Flex justify-content-between" style={{ margin: 0 }}>
        <button className="btn btn-dark rounded-pill p-1 mx-2" onClick={logoutSubmit} title="خروج"><BsBoxArrowLeft /></button>
        {currentDate}
      </div>
      <div style={{ direction: "rtl" }}>
        <h6>إسم المستخدم : {user}</h6>
        <h3>الرئيسية</h3>
        <div className="dashboard">
          <div className="G1">
            <button className="button courrierEntrant" onClick={() => navigate("/courrierEntrant")}><FaInbox size={30} /> البريد الوارد</button>
            <button className="button membres" onClick={() => navigate("/membres")}><FaUserFriends size={30} /> الأعـضاء</button>
          </div>
          <div className="G2">
            <button className="button courrierSortant" onClick={() => navigate("/courrierSortant")}><FaRegEnvelope size={30} /> البريد الصادر</button>
            <button className="button rechercher" onClick={() => navigate("/rechercher")}><FaSearch size={30} /> بحـث</button>
          </div>
          <div className="G3">
            <button className="button archive" onClick={() => navigate("/archive")}><FaArchive size={30} /> الأرشـيف</button>
            <button className="button notifications" onClick={() => navigate("/notifications")}><FaBell size={30} /> تنبيهـــات</button>
          </div>
        </div>
      </div>
    </div>
  )
}
