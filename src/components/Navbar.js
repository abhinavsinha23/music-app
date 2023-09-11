import { Link} from "react-router-dom";
import { getCookie, deleteCookie } from "../common";
import { useState, useEffect } from "react";
import {retrieveUser} from "../utils/index"
import "../App.css";
// import { hover } from "@testing-library/user-event/dist/hover";
import settingsIcon from "../Image/icons8-settings.svg"

function Navbar() {
  const [cookie, setCookie] = useState(getCookie("jwt-token"));
  const [user, setUser] = useState();


  


  useEffect(() => {
    const getUser = async () => {
      const tempUser = await retrieveUser(cookie)
      setUser(tempUser)
    }
    getUser()
  }, [cookie])

  const logout = () => {
    deleteCookie("jwt-token");
    setCookie("");
    
  };

  const changeStyle = (e) => {
    e.target.style.opacity = '0.4'
    e.target.style.textDecoration = 'underline'
  }

  const removeStyle = (e) => {
    e.target.style.opacity = '1'
    e.target.style.textDecoration = 'none'
  }

  return (
    <nav className="navWrap">
      <ul className="navBar">
        
          <li>
          <div className="navBarOption">
            <Link className="navBarOptionText" to="/">Home</Link>
            </div>
          </li>
        

        <div className="navBarOption">
          <li>
            <Link className="navBarOptionText" to="/music">Music</Link>
          </li>
        </div>  

        <div className="navBarOption">
          <li>
            <Link className="navBarOptionText" to="/radio">Radio</Link>
          </li>
        </div>

        {!cookie ? (
          <li className="loginButton navBarOption" >
            <Link className="navBarOptionText" to="/login">Login</Link>
          </li>
        ) : (
          // <div className="logoutBox">
            <li className="loginButton">
              <Link to="/users">
                  <div className="profileButton">
                      <p style={{color:"black"}}>{user?.user?.username}</p>
                      <img style={{marginLeft:"10px"}} width="15" src={settingsIcon} alt="albumModalImg" />
                  </div>
              </Link>
              <Link to="/" onClick={logout} style={{paddingLeft:'50px'}} onMouseEnter={changeStyle} onMouseLeave={removeStyle}>Logout</Link>
            </li>
        )}        
      </ul>
    </nav>
  );
}

export default Navbar;
