import React, {useEffect, useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import search from '../../assets/Search.svg'
import Avatar from '../../components/Avatar/Avatar'
import Button from '../../components/Button/Button'
import './Navbar.css'
import Logo from '../../assets/logo.png'
import { useSelector , useDispatch } from 'react-redux'
import { setCurrentUser } from '../../actions/currentUser'
import decode from 'jwt-decode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { MenuBarContext } from '../../context'

const Navbar = () => {

    var User=useSelector((state)=>state.currentUserReducer)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
        const handleLogout=()=>{
            dispatch({type:'LOGOUT'});
            navigate('/')
            dispatch(setCurrentUser(null)) 
        }

    useEffect(()=>{
        const token=User?.token
        if(token){
            const decodedToken=decode(token);
            if(decodedToken.exp*1000<new Date().getTime()){
                handleLogout()
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    },[User?.token, dispatch])

    
    const { slideIn, setSlideIn } = useContext(MenuBarContext);

    console.log(slideIn)
  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };

  return (
    <nav className="main-nav">
      <div className="navbar">
        <button className="slide-in-icon" onClick={() => handleSlideIn()}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="navbar-1">
          <Link to="/" className="nav-item nav-logo">
            <img src={Logo} alt="logo" />
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            About
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            Products
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            For Teams
          </Link>
          <form>
            <input type="text" placeholder="Search..." />
            <img src={search} alt="search" width="18" className="search-icon" />
          </form>
        </div>
        <div className="navbar-2">
          {User === null ? (
            <Link to="/Auth" className="nav-item nav-links">
              Log in
            </Link>
          ) : (
            <>
              <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="7px"
                borderRadius="50%"
                color="white"
              >
                <Link
                  to={`/Users/${User?.result?._id}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {User.result.name.charAt(0).toUpperCase()}
                </Link>
              </Avatar>
              <button className="nav-item nav-links" onClick={handleLogout}>
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar