import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// Définition du composant d'inscription
function Inscription() {
  // Déclaration des états pour stocker les valeurs des champs et les messages d'erreur
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [division, setDivision] = useState("----"); // Champ de classe
  const [poste, setposte] = useState(""); // Champ chef de classe
  const [services, setServices] = useState("----"); // Champ service

  // Effet pour effacer le message après un certain délai
  useEffect(() => {
    setTimeout(function () {
      setMsg("");
    }, 15000);
  }, [msg]);

  // Fonction pour gérer les changements dans les champs du formulaire
const handleInputChange = (e, type) => {
  switch (type) {
      case "user":
          setError("");
          setUser(e.target.value);
          if (e.target.value === "") {
              setError("الرجاء إدخال الإسم الكامل");
          }
          break;
      case "email":
          setError("");
          setEmail(e.target.value);
          if (e.target.value === "") {
              setError("الرجاء إدخال البريد الإلكتروني");
          } else {
              const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:men\.gov\.ma|taalim\.ma)$/;
              if (!emailRegex.test(e.target.value)) {
                  setError("يجب أن يكون البريد الإلكتروني مقبولاً وينتهي بـ @men.gov.ma أو @taalim.ma");
              }
          }
          break;
      case "pass1":
          setError("");
          setPass1(e.target.value);
          if (e.target.value === "") {
              setError("ادخل كلمة السر");
          }
          break;
      case "pass2":
          setError("");
          setPass2(e.target.value);
          if (e.target.value !== pass1 && e.target.value !== "") {
              // Ne définissez pas d'erreur si pass2 n'est pas vide mais ne correspond pas à pass1
              setError("كلمة المرور غير متطابقة!");
          }
          break;
      case "division": // Gérer les changements de champ de division
          setError("");
          setDivision(e.target.value);
          if (e.target.value === "----") {
              setError("الرجاء اختيار القسم");
          }
          break;
      case "poste": 
          setError("");
          setposte(e.target.value);
          if (e.target.value === "") {
              setError("الرجاء تحديد الصفة");
          }
          break;
      case "service": // Gérer les changements de champ service
          setError("");
          setServices(e.target.value);
          if (e.target.value === "") {
              setError("الرجاء تحديد المصلحة");
          }
          break;
      default:
  }
};


  // Fonction pour soumettre le formulaire
  function handleSubmit() {
    if (
      user !== "" &&
      email !== "" &&
      pass1 !== "" &&
      pass2 !== "" &&
      division !== "----" &&
      services !== "" &&
      poste !== ""
    ) {
      if (pass1 === pass2) {
        // Vérification de la correspondance des mots de passe
        var url = "http://localhost/connexion/registration/registration.php";
        var headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        var Data = {
          user: user,
          email: email,
          pass: pass2,
          division: division,
          services: services,
          poste: poste,
        };

        // Vérification de l'e-mail existant
        var checkEmailUrl = "http://localhost/connexion/registration/checkemail.php";
        fetch(checkEmailUrl, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ email: email }),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response[0].result === "البريد الإلكتروني مسجل سابقا") {
              setError(response[0].result); // Afficher le message d'erreur
            } else {
              // Si l'e-mail n'existe pas encore, soumettre le formulaire
              fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(Data),
              })
                .then((response) => response.json())
                .then((response) => {
                  setMsg(response[0].result); // Afficher le message de succès
                  // Réinitialisation des champs après soumission réussie
                  setUser("");
                  setEmail("");
                  setPass1("");
                  setPass2("");
                  setDivision("----");
                  setServices("");
                  setposte("");
                })
                .catch((err) => {
                  setError(err);
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            setError(err);
            console.log(err);
          });
      } else {
        setError("كلمات المرور غير متطابقة!"); // Message d'erreur si les mots de passe ne correspondent pas
      }
    } else {
      setError("يجب ملء كل حقول الإستمارة"); // Message d'erreur si tous les champs ne sont pas remplis
    }
}



  // Fonction pour vérifier l'existence de l'email dans la base de données
  function checkEmail() {
    var url = "http://localhost/connexion/registration/checkemail.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var Data = {
      email: email,
    };
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response[0].result === "البريد الإلكتروني مسجل سابقا") {
          setMsg(response[0].result);
          setTimeout(() => {
            setMsg("");
          }, 5000); // 5000 milliseconds = 5 seconds
        } else {
          setError(response[0].result);
        }
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
}

  return (
    <section className="vh-100">
      <div className="mask d-flex align-items-center h-90 ">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div
                className="card"
                style={{
                  borderRadius: 15,
                  boxShadow: "3px 3px 3px silver",
                  direction: "rtl",
                }}
              >
                <div className="card-body p-4">
                  <h2 className="text-uppercase text-center mb-4">
                    إنشاء حساب جديد
                  </h2>
                  <p>
                    {msg !== "" ? (
                      <span className="success">{msg}</span>
                    ) : (
                      <span className="error">{error}</span>
                    )}
                  </p>
                  <div className="form-outline">
                    <input
                      type="text"
                      name="user"
                      className="form-control form-control-lg"
                      value={user}
                      onChange={(e) => handleInputChange(e, "user")}
                    />
                    <label className="form-label mb-3">
                      الإسم الكامل<span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="form-outline">
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => handleInputChange(e, "email")}
                      onBlur={checkEmail}
                    />
                    <label className="form-label mb-3"> البريد الإلكتروني<span style={{ color: "red" }}>*</span></label>
                  </div>
                  {/* Champ de division */}
                  <div className="form-outline ">
                    <select
                      className="form-control form-control-lg"
                      value={division}
                      onChange={(e) => handleInputChange(e, "division")}>
                      <option value="">----</option>
                      <option value="المدير">المدير</option>
                      <option value="الكتابة الخاصة للسيد المدير">الكتابة الخاصة للسيد المدير</option>
                      <option value="مكتب الضبط">مكتب الضبط</option>
                      <option value="قسم الشؤون الإدارية والمالية">قسم الشؤون الإدارية والمالية</option>
                      <option value="قسم تدبير الموارد البشرية">قسم تدبير الموارد البشرية</option>
                      <option value="قسم التخطيط والخريطة المدرسية">قسم التخطيط والخريطة المدرسية</option>
                      <option value="قسم الشؤون التربوية">قسم الشؤون التربوية</option>
                      <option value="المركز الجهوي لمنظومة الإعلام في حكم قسم">المركز الجهوي لمنظومة الإعلام في حكم قسم</option>
                    </select>
                    <label className="form-label mb-3">القسم <span style={{ color: "red" }}>*</span></label>
                  </div>
                  {/* Champ chef de division */}
                  <div className="form-outline ">
                    <div className="d-flex ">
                      <input
                        list="posteOptions"
                        className="form-control form-control-lg"
                        value={poste}
                        placeholder="..."
                        onChange={(e) => handleInputChange(e, "poste")}/>
                      <datalist id="posteOptions">
                        <option value="مدير" />
                        <option value="رئيس قسم" />
                      </datalist>
                    </div>
                    <label className="form-label mb-3">الصفة<span style={{ color: "red" }}>*</span></label>
                    {/* Champ service */}
                    <div className="form-outline">
                      <select
                        className="form-control form-control-lg"
                        value={services}
                        name="services"
                        onChange={(e) => handleInputChange(e, "service")}>
                        <option value="----">----</option>
                        <option value="مصلحة التواصل وتتبع أشغال المجلس الإداري">مصلحة التواصل وتتبع أشغال المجلس الإداري</option>
                        <option value="مصلحة الشؤون القانونية والشراكة">مصلحة الشؤون القانونية والشراكة</option>
                        <option value="مصلحة التعلم والتكوين عن بعد">مصلحة التعلم والتكوين عن بعد</option>
                        <option value="المركز الجهوي للإمتحانات">المركز الجهوي للإمتحانات</option>
                        <option value="الوحدة الجهوية للإفتحاص">الوحدة الجهوية للإفتحاص</option>
                        <option value="المركز الجهوي للتوجيه المدرسي والمهني">المركز الجهوي للتوجيه المدرسي والمهني</option>
                        <option value="المختبر الجهوي للإبتكار وإنتاج الموارد الرقمية">المختبر الجهوي للإبتكار وإنتاج الموارد الرقمية</option>
                        <option value="مصلحة الميزانية والمحاسبة">مصلحة الميزانية والمحاسبة</option>
                        <option value="مصلحة البناءات والتجهيزات والتهيئة والممتلكات">مصلحة البناءات والتجهيزات والتهيئة والممتلكات</option>
                        <option value="مصلحة المشتريات والصفقات">مصلحة المشتريات والصفقات</option>
                        <option value="مصلحة الدعم الإجتماعي">مصلحة الدعم الإجتماعي</option>
                        <option value="مصلحة التدبير التوقعي للموارد البشرية وإعادة الإنتشار">مصلحة التدبير التوقعي للموارد البشرية وإعادة الإنتشار</option>
                        <option value="مصلحة تدبير الوضعيات الإدارية للموظفين">مصلحة تدبير الوضعيات الإدارية للموظفين</option>
                        <option value="مصلحة تدبير المسار المهني للموظفين والإرتقاء بالموارد البشرية">مصلحة تدبير المسار المهني للموظفين والإرتقاء بالمواردالبشرية</option>
                        <option value="مصلحة التخطيط والخريطة المدرسية">مصلحة التخطيط والخريطة المدرسية</option>
                        <option value="مصلحة الإحصاء والدراسات"> مصلحة الإحصاء والدراسات</option>
                        <option value="مصلحة الإرتقاء بتدبير المؤسسات التعليمية">مصلحة الإرتقاء بتدبير المؤسسات التعليمية</option>
                        <option value="مصلحة الإشراف على مؤسسات التعليم المدرسي الخصوصي">مصلحة الإشراف على مؤسسات التعليم المدرسي الخصوصي</option>
                        <option value="مصلحة التربية الدامجة">مصلحة التربية الدامجة</option>
                        <option value="المركز الجهوي للتوثيق والتنشيط والإنتاج التربوي">المركز الجهوي للتوثيق والتنشيط والإنتاج التربوي</option>
                        <option value="مصلحة الرياضة المدرسية">مصلحة الرياضة المدرسية</option>
                        <option value="مصلحة التعليم الأولي">مصلحة التعليم الأولي</option>
                      </select>
                      <label className="form-label mb-3">المصلحة</label>
                    </div>
                    <div className="form-outline">
                      <input
                        type={showPassword1 ? "text" : "password"}
                        name="pass1"
                        className="form-control form-control-lg"
                        value={pass1}
                        onChange={(e) => handleInputChange(e, "pass1")}
                      />
                      <label className="form-label">
                        كلمة المرور<span style={{ color: "red" }}>*</span>
                      </label>
                      <div
                          className="password-toggle-btn"
                          style={{width:"20px",position:'relative',right:"93%",bottom:'68px'}}
                          onClick={() => setShowPassword1(!showPassword1)}>
                          {showPassword1 ? <FaEyeSlash /> : <FaEye />} {/* Utilisez l'icône appropriée en fonction de l'état actuel */}
                      </div>
                    </div>
                    <div className="form-outline">
                      <input
                        type={showPassword2 ? "text" : "password"}
                        name="pass2"
                        className="form-control form-control-lg"
                        value={pass2}
                        onChange={(e) => handleInputChange(e, "pass2")}
                      />
                      <label className="form-label">
                        إعادة كلمة المرور<span style={{ color: "red" }}>*</span>
                      </label>
                      <div
                          className="password-toggle-btn"
                          style={{width:"20px",position:'relative',right:"93%",bottom:'68px'}}
                          onClick={() => setShowPassword2(!showPassword2)}>
                          {showPassword2 ? <FaEyeSlash /> : <FaEye />} {/* Utilisez l'icône appropriée en fonction de l'état actuel */}
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <input
                        type="submit"
                        value="إرســـال"
                        className="btn btn-dark btn-block btn-lg text-white gradient-custom-4"
                        onClick={handleSubmit}
                      />
                    </div>
                    <p className="text-center mt-4">
                      <Link to="/" style={{textDecoration:'none'}}>تسجيل الدخول</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Inscription;
