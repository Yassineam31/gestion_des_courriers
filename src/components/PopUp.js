import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function PopUp() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const handleClickOpen = () => {
    setPopup(true);
    setResultMessage(""); // Réinitialiser le message lorsque le popup s'ouvre
  };

  const closePopup = () => {
    setPopup(false);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (email && newPassword) {
      try {
        const response = await fetch("http://localhost/connexion/login/mot_de_passe_oublie.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, newPassword: newPassword }),
        });
        const data = await response.json();
        setResultMessage(data.result);
        // Réinitialiser les champs email et newPassword après la soumission réussie
        setEmail("");
        setNewPassword("");
        // Fermer le popup après un certain délai (par exemple, 0.8 secondes) uniquement si le message est celui de succès
        if (data.result === "تم تحديث كلمة المرور بنجاح!") {
          setTimeout(() => {
            setPopup(false);
          }, 800); // 500 millisecondes = 0.8 secondes
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setResultMessage("يرجى ملء جميع الحقول");
    }
  };

  return (
    <>
      <section>
        <div>
          <Link onClick={handleClickOpen} style={{ textDecoration: "none" }}>
            نسيت كلمة المرور
          </Link>
          <div>
            {popup && (
              <div className="main-popup">
                <div className="popup">
                  <div className="popup-header">
                    <h5 onClick={closePopup} className="x">
                      X
                    </h5>
                  </div>
                  <div>
                    <form onSubmit={handlePasswordReset}>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="البريد الإلكتروني*"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="كلمة المرور الجديدة*"
                        />
                        <div
                          className="password-toggle-btn"
                          style={{width:"20px",position:'relative',right:"90%",bottom:'45px'}}
                          onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Utilisez l'icône appropriée en fonction de l'état actuel */}
                      </div>
                      </div>
                      <div className="button-container">
                        <button type="submit" className="btn btn-dark">
                          تحديث
                        </button>
                      </div>
                    </form>
                    {resultMessage && (
                      <div className="result-message">
                        <p>{resultMessage}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default PopUp;
