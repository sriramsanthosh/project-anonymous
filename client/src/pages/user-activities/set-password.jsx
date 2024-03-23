import { ToastContainer, toast } from "react-toastify";
import Rocket from "../images/rocket.svg";
import NavBar from "../../components/navbar";
import Axios from "axios";
import { RESET_PASSWORD } from "../../apis/user";
import { useNavigate } from "react-router-dom";

const SetPassword = () => {

    const Navigate = useNavigate();
    async function validatePassword(e) {
        e.preventDefault();
        let user_id = await localStorage.getItem("user_id");
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
    }

    return (
        <div>
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