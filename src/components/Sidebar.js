import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTh, FaCommentAlt } from "react-icons/fa";
import { AiFillStepForward } from "react-icons/ai";
import { MdSend, MdDrafts } from "react-icons/md";
import { ImSearch } from "react-icons/im";
import { IoIosPeople,IoIosArchive } from "react-icons/io";

// Composant Sidebar représentant la barre latérale de navigation
const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture et la fermeture de la barre latérale

    // Fonction pour basculer l'état de la barre latérale entre ouvert et fermé
    const toggle = () => setIsOpen(!isOpen);

    // Fonction pour fermer la barre latérale
    const closeSidebar = () => setIsOpen(false);

    // Tableau des éléments du menu avec leurs chemins, noms et icônes
    const menuItem = [
        {
            path: "/Dashboard",
            name: "الرئيسية",
            icon: <FaTh />
        },
        {
            path: "/courrierEntrant",
            name: "البريد الوارد",
            icon: <MdDrafts />
        },
        {
            path: "/courrierSortant",
            name: "البريد الصادر",
            icon: <MdSend />
        },
        {
            path: "/notifications",
            name: "تنبيهات",
            icon: <FaCommentAlt />
        },
        {
            path: "/rechercher",
            name: "بحث",
            icon: <ImSearch />
        },
        {
            path: "/archive",
            name: "أرشيف",
            icon: <IoIosArchive />
        },
        {
            path: "/membres",
            name: "أعضاء",
            icon: <IoIosPeople />
        }
    ];

    // Rendu de la barre latérale
    return (
        <div className='conteneur'>
            <main>{children}</main>
            {/* Barre latérale */}
            <div style={{ width: isOpen ? "250px" : "50px", direction: "rtl" }} className="sidebar">
                {/* Section supérieure de la barre latérale */}
                <div className="top_section">
                    {/* Bouton de bascule pour ouvrir/fermer la barre latérale */}
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {/* Liens du menu */}
                {menuItem.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link" activeclassname="active">
                        {/* Icône */}
                        <div className="icon">{item.icon}</div>
                        {/* Texte du lien */}
                        <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                    </NavLink>
                ))}
                {/* Bouton de fermeture de la barre latérale */}
                <div style={{ fontSize: '20px', margin: '10px', direction: 'ltr', display: isOpen ? "block" : "none" }} onClick={closeSidebar}>
                    <AiFillStepForward />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
