import { ToastContainer, toast } from "react-toastify";
import NavBar from "../../components/navbar";
import { NavLink, useNavigate } from "react-router-dom";
import Rocket from "../images/rocket.svg";
import Axios from "axios";
import { FORGOT_PASSWORD } from "../../apis/user";



const ForgotPassword = () => {


    const Navigate = useNavigate();
    async function handleForgotPassword(e) {
        e.preventDefault();
        const userEmail = document.getElementById("email").value;
        await Axios.post(FORGOT_PASSWORD, { email: await userEmail }).then(async (res) => {
            switch (await res.status) {
                case 203:
                    toast.success(res.data.success_msg);
                    toast.error(res.data.error_msg);
                    toast.warn(res.data.warn_msg);
                    break;
                case 200:
                    Navigate("/login-auth", { state: { data: res.data } });
                    toast.success(res.data.success_msg);
                    break;
                default:
            }
        }).catch((err) => {
            toast.error("Connection Error.. Backend Database");
        })
    }


    return (
        <div>
            <div className="loader"></div>
            <NavBar />
            <main>
                <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="colored" />
                <div className="card">
                    <img className='rocket-icon single-rocket' src={Rocket} alt="rocket-icon" />
                    <h1>Forgot Your Password</h1>

                    <form onSubmit={handleForgotPassword} >
                        <input className="input-box" type="email" name="email" id="email" placeholder="Enter Email ID" required /><br />
                        <button type="submit" className="continue-button">Continue &nbsp; <i className="fa-solid fa-arrow-right"></i></button>
                    </form>
                    <p>Go back to <NavLink to="/login" >Login</NavLink></p>
                </div>
            </main>
        </div>
    )
}

export default ForgotPassword;
