import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PopUp from "./PopUp";
import "../styles/popup.css";
// Composant de connexion
export default function Login() {
  const navigate = useNavigate(); // Utilisation du hook useNavigate pour la navigation
  const [user, setUser] = useState(""); // État pour stocker le nom d'utilisateur
  const [pass, setPass] = useState(""); // État pour stocker le mot de passe
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // État pour gérer les messages d'erreur
  const [msg, setMsg] = useState(""); // État pour gérer les messages d'information

  // Effet de chargement
  useEffect(() => {
    // Vérification si l'utilisateur est déjà connecté en utilisant les données locales
    let login = localStorage.getItem("login");
    if (login) {
      navigate("/dashboard"); // Rediriger vers le tableau de bord si l'utilisateur est déjà connecté
    }

    // Gestion des erreurs de connexion stockées localement
    let loginStatus = localStorage.getItem("loginStatus");
    if (loginStatus) {
      setError(loginStatus);
      localStorage.clear(); // Nettoyer les données locales
      setTimeout(function () {
        localStorage.clear();
        window.location.reload(); // Recharger la page
      }, 1000);
    }

    // Effacer le message après un certain délai
    setTimeout(function () {
      setMsg("");
    }, 5000);
  }, [msg, navigate]);

  // Fonction pour gérer les changements dans les champs de saisie
  const handleInputChange = (e, type) => {
    switch (type) {
      case "user":
        setError("");
        setUser(e.target.value);
        if (e.target.value === "") {
          setError("الرجاء إدخال إسم المستخدم");
        }
        break;
      case "pass":
        setError("");
        setPass(e.target.value);
        if (e.target.value === "") {
          setError("الرجاء إدخال كلمة المرور");
        }
        break;
      default:
    }
  };

  // Fonction pour soumettre le formulaire de connexion
  function loginSubmit() {
    if (user !== "" && pass !== "") {
      var url = "http://localhost/connexion/login/login.php";
      var headers = {
        Accept: "application/json",
        "Content-type": "application/json",
      };
      var Data = {
        user: user,
        pass: pass,
      };
      // Requête fetch pour envoyer les données de connexion au serveur
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          // Gestion de la réponse du serveur
          console.log(response);
          if (
            response[0].result === "اسم المستخدم غير صحيح" ||
            response[0].result === "كلمة المرور غير صحيحة"
          ) {
            setError(response[0].result); // Affichage de l'erreur si les informations de connexion sont incorrectes
          } else {
            setMsg(response[0].result); // Affichage du message de succès de connexion
            // Stockage des informations de connexion dans les données locales et redirection vers le tableau de bord
            setTimeout(function () {
              localStorage.setItem("login", true);
              localStorage.setItem("user", user);
              navigate("/dashboard");
            }, 1000);
          }
        })
        .catch((err) => {
          setError(err);
          console.log(err);
        });
    } else {
      setError("الرجاء ملء الخانات"); // Affichage de l'erreur si tous les champs ne sont pas remplis
    }
  }
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#fff" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-8">
              <div
                className="card"
                style={{
                  borderRadius: "1rem",
                  boxShadow: "3px 3px 3px silver",
                  direction: "rtl",
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <div>
                      {error !== "" ? (
                        <div style={{ color: "#842029" }}>
                          <b>{error}</b>
                        </div>
                      ) : (
                        <div style={{ color: "#badbcc" }}>
                          <b>{msg}</b>
                        </div>
                      )}
                    </div>
                    <div className="d-flex align-items-center mb-3 pb-1"></div>
                    <h5
                      className="fw-normal mb-3 pb-3"
                      style={{ letterSpacing: 1 }}
                    >
                      الدخول إلى حسابك
                    </h5>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="username"
                        className="form-control form-control-lg"
                        value={user}
                        onChange={(e) => handleInputChange(e, "user")}
                      />
                      <label className="form-label" htmlFor="username">
                        إسم المستخدم <span style={{ color: "red" }}>*</span>
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="pass"
                        className="form-control form-control-lg"
                        value={pass}
                        onChange={(e) => handleInputChange(e, "pass")}
                      />
                      <label className="form-label" htmlFor="pass">
                        كلمة المرور <span style={{ color: "red" }}>*</span>
                      </label>
                      <div
                          className="password-toggle-btn"
                          style={{width:"20px",position:'relative',right:"95%",bottom:'68px'}}
                          onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Utilisez l'icône appropriée en fonction de l'état actuel */}
                      </div>
                    </div>
                    <div className="pt-1 mb-4">
                      <input
                        type="submit"
                        value="تسجيل الدخول"
                        className="btn btn-dark btn-lg btn-block"
                        onClick={loginSubmit}
                      />
                    </div>
                    <div className="liens" style={{ textAlign: "center",lineHeight:"40px" }}>
                      <PopUp />
                      <Link  to="/inscription" style={{ textDecoration: "none" }}>إنشاء حساب جديد</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
