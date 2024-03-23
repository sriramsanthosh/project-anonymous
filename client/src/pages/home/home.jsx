import { NavLink, useNavigate } from "react-router-dom";
import Rocket from "../images/rocket.svg";
import NavBar from "../../components/navbar";

function Home() {
    const navigate = useNavigate();

    return <div className="App HomeApp">
        <NavBar />
        <main className="text-center home-main-content">
            <div className='india-button-container'><sub><img className='rocket-icon' src={Rocket} alt="rocket-icon" /> </sub><span className="india-button-container-text">For Indian Users Only</span></div>
            <h1 className="main-content-heading">Start posting anonymously where no one will judge.</h1>
            <div className="main-content-heading-quote">Welcome to Stranger discussion forum</div>
            <button onClick={() => navigate("/sign-up")} className='india-button-container create-your-account'>Create Your Account &nbsp; <i className="fa-solid fa-arrow-right"></i></button>
            <p>Already have account? <button className="login-button" onClick={() => navigate("/login")}>Login</button></p>
        </main>
        <footer>
            <div className="author-sign"><span className="orange-color">Made with</span> &nbsp;<i className="fa-solid fa-heart"></i>&nbsp; <NavLink className="author-profile-link" to="https://www.linkedin.com/in/sriramsanthosh/" target="_blank">Sriram&nbsp;Santhosh</NavLink></div>
        </footer>
    </div>
}

export default Home;