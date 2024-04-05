import { ToastContainer, toast } from "react-toastify";
import Rocket from "../images/rocket.svg";
import NavBar from "../../components/navbar";
import Axios from "axios";
import { RESET_PASSWORD } from "../../apis/user";
import { useLocation, useNavigate } from "react-router-dom";
import LinearIndeterminate from "../../components/loaderMUI";
import { useState } from "react";

const SetPassword = () => {

    const { state } = useLocation();
    const Navigate = useNavigate();

    let { data } = state;
    let userData = data;

    const [loader, setloader] = useState(false);
    async function validatePassword(e) {
        e.preventDefault();
        setloader(true);
        let user_id = userData._id;
        if (e.target.newPassword.value === e.target.confirmNewPassword.value) {
            let password = e.target.newPassword.value;
            await Axios.post(RESET_PASSWORD, { user_id, password }).then(async (res) => {
                Navigate("/new-post", { state: { data: res.data.userData } });
                setTimeout(() => {
                    toast.success(res.data.success_msg);
                }, 500);
            }).catch((err) => {
                toast.error("Error in Backend.. Try Again!");
            });
        }
        setloader(false);
    }

    return (
        <div>
            <div style={{height:"8px"}}>
                {loader && <LinearIndeterminate />}
            </div>
            <NavBar />
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="colored" />
            <main>
                <div className="card">
                    <img className='rocket-icon single-rocket' src={Rocket} alt="rocket-icon" />
                    <h1>Set Your Account Password</h1>
                    <p>Passwords are like secrets, keep them safe and share sparingly</p>
                    <form onSubmit={validatePassword}>
                        <input className="input-box" type="password" id="newPassword" placeholder="Enter new password" required /><br />
                        <input className="input-box" type="password" id="confirmNewPassword" placeholder="Confirm new Password" required /><br />
                        <button type="submit" className="continue-button">Continue &nbsp; <i className="fa-solid fa-arrow-right" ></i></button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default SetPassword;