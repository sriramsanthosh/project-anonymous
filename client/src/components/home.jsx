import { useNavigate } from "react-router-dom";
import AppIcon from "../images/appIcon.svg";
import Rocket from "../images/rocket.svg";
import axios from "axios";
const {HOME} = require('../apis/user');

function Home(){
    const navigate = useNavigate();

    axios.get(HOME).then(async(res)=>{
        console.log(res.data.message);
    });

    return <div className="App HomeApp">
    <header>
      <nav className = "outer-container">
            <div className="nav-left inner-container outer-container">
                <div className="inner-container logo-container"><img className='app-icon logo' src={AppIcon} alt="app-icon" /></div>
                <h1 className="inner-container"> ANONYMOUS</h1>
            </div>
      </nav>
    </header>

    <main className="text-center">
        <div className='india-button-container'><sub><img className='rocket-icon' src={Rocket} alt="rocket-icon" /> </sub><span className="india-button-container-text">For Indian Users Only</span></div>
        <h1 className = "main-content-heading">Start posting anonymously where no one will judge.</h1>
        <div className="main-content-heading-quote">Welcome to Stranger discussion forum</div>
        <button onClick={() => navigate("/sign-up")} className='india-button-container create-your-account'>Create Your Account &nbsp; <i class="fa-solid fa-arrow-right"></i></button>
        <p>Already have account? <button className="login-button" onClick={() => navigate("/login")}>Login</button></p>
    </main>
    <footer>
        <div className="author-sign"><span className="orange-color">Made with</span> <i class="fa-solid fa-heart"></i>&nbsp;<a className="author-profile-link" href="https://www.linkedin.com/in/sriramsanthosh/" target="_blank">Sriram&nbsp;Santhosh</a></div>
    </footer>
    </div>
}

export default Home;