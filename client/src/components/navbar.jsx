import AppIcon from "../pages/images/appIcon.svg";


const NavBar = () => {
    return(
    <header> 
    <nav className = "outer-container">
          <div className="nav-left inner-container outer-container">
              <div className="inner-container logo-container"><img className='app-icon logo' src={AppIcon} alt="app-icon" /></div>
              <h1 className="inner-container"> ANONYMOUS</h1>
          </div>
    </nav>
  </header>)
}

export default NavBar;
