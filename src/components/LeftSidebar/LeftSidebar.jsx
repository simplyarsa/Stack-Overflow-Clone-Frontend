import React, {useContext} from "react";
import "./LeftSidebar.css";
import { NavLink } from "react-router-dom";
import Globe from "../../assets/Globe.svg";
import { MenuBarContext } from "../../context";

const LeftSidebar = () => {

  const { slideIn } = useContext(MenuBarContext);

  const slideInStyle = {
    transform: "translateX(0%)",
    
  };

  const slideOutStyle = {
    transform: "translateX(-100%)",
  };

  return (
    <div className="left-sidebar"
    style={slideIn ? slideInStyle : slideOutStyle}
  > 
      <nav className="side-nav">
       
          <NavLink to="/" className="side-nav-links" activeclassname="active">
            <p>Home</p>
          </NavLink>
        
        <div className="side-nav-div">
          <div>
            <p>PUBLIC</p>
          </div>
         
            <NavLink
              to="/Questions"
              className="side-nav-links"
              activeClassName="active"
            >
              <img src={Globe} alt="Globe" />
              <p style={{ paddingLeft: "10px" }}> Questions </p>
            </NavLink>

            <NavLink
              to="/Tags"
              className="side-nav-links"
              activeClassName="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Tags</p>
            </NavLink>
          
            <NavLink
              to="/Users"
              className="side-nav-links"
              activeClassName="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Users</p>
            </NavLink>
            <NavLink
              to="/Chatbot"
              className="side-nav-links"
              activeClassName="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Chatbot</p>
            </NavLink>
            <NavLink
              to="/Friends"
              className="side-nav-links"
              activeClassName="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Friends</p>
            </NavLink>      
            <NavLink
              to="/Social"
              className="side-nav-links"
              activeClassName="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Social</p>
            </NavLink>
            <NavLink
              to="/Subscription"
              className="side-nav-links"
              activeClassName="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Subscription</p>
            </NavLink>
          
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;