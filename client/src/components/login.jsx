import AppIcon from "../images/appIcon.svg";
import Rocket from "../images/rocket.svg";
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom";

import { LOGIN } from "../apis/user";

function Login() {
    const { state } = useLocation();
    const Navigate = useNavigate();

    function loginHandler(e){
        e.preventDefault();
        let userEmail = document.getElementById('email').value;
        axios.post(LOGIN, {userEmail}).then(async (res)=>{
            switch(await res.status){
                case 200:
                    Navigate("/login-auth", {state: {data: res.data}}); 
                    break;
                case 201:
                    alert(res.data.message);
                    break;
                default:
            }
        });
    }

    return <div>
    <header>
      <nav className = "outer-container">
            <div className="nav-left inner-container outer-container">
                <div className="inner-container logo-container"><img className='app-icon logo' src={AppIcon} alt="app-icon" /></div>
                <h1 className="inner-container"> ANONYMOUS</h1>
            </div>
      </nav>
    </header>

    <main>
        <div className="card">
            <img className='rocket-icon single-rocket' src={Rocket} alt="rocket-icon" />
            <h1>Login to Your Account</h1>

            <form onSubmit={loginHandler} >
                <input className="input-box" type="email" name="email" id="email" placeholder="Enter Email ID" required/><br />
                <button type="submit" className="continue-button">Continue &nbsp; <i class="fa-solid fa-arrow-right"></i></button>
            </form>
        </div>
    </main>
    </div>
}

export default Login;