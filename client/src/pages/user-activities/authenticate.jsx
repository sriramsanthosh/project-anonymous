import { REGISTER } from "../../apis/user";
import axios from "axios";
import AppIcon from "../images/appIcon.svg";
import Rocket from "../images/rocket.svg";

import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyToastContainer from "../../components/toast-container";
import { useState } from "react";
import LinearIndeterminate from "../../components/loaderMUI";

function Authenticate() {
    const { state } = useLocation();
    const Navigate = useNavigate();
    let { data } = state;
    let userData = data.user;

    const [otpValidation, setOtpValidation] = useState(false);
    const [loader, setloader] = useState(false);

    async function handleCreateAccount(e) {
        setloader(true);
        e.preventDefault();
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirm-password").value;
        if (password === confirmPassword) {
            await axios.post(REGISTER, { userData, password }).then(async (res) => {
                await res.status === 200 ? Navigate("/auth-success", { state: { data: res.data } }) : alert("Error in creating account!!");
            });
        }
        setloader(false);
    }

    function validateOtp(e) {
        e.preventDefault();
        setloader(true);
        let number = document.getElementById("otp").value;
        if (number === data.otp) {
            toast.success("Validation Success !");
            setOtpValidation(true);

        }
        else {
            toast.error("Wrong OTP !");
        }
        setloader(false);
    }

    return <div>
        <div style={{height:"8px"}}>
            {loader && <LinearIndeterminate />}
        </div>
        <MyToastContainer />
        <header>
            <nav className="outer-container">
                <div className="nav-left inner-container outer-container">
                    <div className="inner-container logo-container"><img className='app-icon logo' src={AppIcon} alt="app-icon" /></div>
                    <h1 className="inner-container"> ANONYMOUS</h1>
                </div>
            </nav>
        </header>

        <main>

            {!otpValidation && <div className="card">
                <img className='rocket-icon single-rocket' src={Rocket} alt="rocket-icon" />
                <h1>Create Your Account</h1>
                <p className="verify-otp-text">Please verify your email ID to continue. We have sent an OTP to the emailID {userData.email}</p>

                <form onSubmit={validateOtp} >
                    <input className="input-box" type="text" id="otp" placeholder="Enter OTP" required /><br />
                    <button type="submit" className="continue-button">Continue &nbsp; <i className="fa-solid fa-arrow-right" ></i></button>
                </form>
            </div>}
            {otpValidation && <div className="card">
                <img className='rocket-icon single-rocket' src={Rocket} alt="rocket-icon" />
                <h1>Create Password</h1>
                <p style={{ width: "80%", textAlign: "center", margin: "auto", paddingBottom: "10px" }}>Passwords are like secrets, keep them safe and share sparingly</p>
                <form onSubmit={handleCreateAccount} >
                    <input className="input-box" type="password" id="password" placeholder="Password" required /><br />
                    <input className="input-box" type="password" id="confirm-password" placeholder="Confirm Password" required /><br />
                    <button type="submit" className="continue-button">Continue &nbsp; <i className="fa-solid fa-arrow-right" ></i></button>
                </form>
            </div>}

        </main>

    </div>
}

export default Authenticate;