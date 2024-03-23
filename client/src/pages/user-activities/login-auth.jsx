import Rocket from "../images/rocket.svg";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../../components/navbar";

const { RENDERPOST } = require("../../apis/user");

function LoginAuth() {
    const { state } = useLocation();
    const Navigate = useNavigate();
    let { data } = state;
    let userData = data.user;

    async function validateOtp(e) {
        e.preventDefault();
        let number = document.getElementById("otp").value;
        if (number === data.otp) {
            await axios.post(RENDERPOST, userData).then(async (res) => {
                if (res.status === 200) {
                    Navigate("/set-password");
                    setTimeout(() => {
                        toast.success("Validation Success");
                    }, 500);
                }
                else {
                    toast.error("Something went wrong.. Try Again!");
                }
            });
        }
        else {
            toast.error("Wrong OTP!!");
        }
    }
    return <div>
        <NavBar />
        <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="colored" />
        <main>

            <div className="card">
                <img className='rocket-icon single-rocket' src={Rocket} alt="rocket-icon" />
                <h1>Verify Your Account</h1>
                <p className="verify-otp-text">Please verify your email ID to continue. We have sent an OTP to emailID <span >{userData.email}</span></p>
                <form onSubmit={validateOtp}>
                    <input className="input-box" type="text" id="otp" placeholder="Enter OTP" required /><br />
                    <button type="submit" className="continue-button">Continue &nbsp; <i className="fa-solid fa-arrow-right" ></i></button>
                </form>
            </div>
        </main>
    </div>
}

export default LoginAuth;
