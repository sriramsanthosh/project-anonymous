import AppIcon from "../images/appIcon.svg";
import Rocket from "../images/rocket.svg";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const {RENDERPOST} = require("../apis/user");

function LoginAuth() {
    const { state } = useLocation();
    const Navigate = useNavigate();
    let {data} = state;
    let userData = data.user;

    // console.log(data);
    console.log("OTP Sent!!");

    function validateOtp(e){
        e.preventDefault();
        let number = document.getElementById("otp").value;
        console.log(data.otp);
        if(number === data.otp){
            axios.post(RENDERPOST, userData).then(async (res)=>{
                console.log(res.data);
                await res.status === 200 ? Navigate("/feed", {state: {data: userData, posts:res.data.post}}) : alert("Error rendering Page!!");
            });
        }
        else{
            alert("👻 Wrong OTP!!");
        }
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
            <h1>Create Your Account</h1>
            <p className="verify-otp-text">Please verify your email ID to continue. We have sent an OTP to emailID <span >{userData.email}</span></p>
            
            <form  onSubmit={validateOtp} >
                <input className="input-box" type="text" id="otp" placeholder="Enter OTP" required/><br />
                <button type="submit" className="continue-button">Continue &nbsp; <i class="fa-solid fa-arrow-right" ></i></button>
            </form>
        </div>
    </main>
    </div>
}

export default LoginAuth;
