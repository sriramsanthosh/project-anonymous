import Rocket from "../images/rocket.svg";
import axios from "axios"
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN } from "../../apis/user";
import NavBar from "../../components/navbar";
import MyToastContainer from "../../components/toast-container";
import { toast } from "react-toastify";

function Login() {
    const { state } = useLocation();
    const Navigate = useNavigate();

    async function loginHandler(e) {
        e.preventDefault();
        let userEmail = await document.getElementById('email').value;
        let userPassword = await document.getElementById('password').value;

        await axios.post(LOGIN, { userEmail, userPassword }).then(async (res) => {
            switch (await res.status) {
                case 200:
                    Navigate("/new-post", { state: { data: await res.data.user } });
                    setTimeout(() => {
                        toast.success("Login Success!");
                    }, 500);
                    break;
                case 201:
                    toast.warn(res.data.warn_msg);
                    toast.error(res.data.error_msg);
                    break;
                default:
            }
        });
    }

    return (<div>
        <div className="loader"></div>
        <NavBar />
        <main>
            <MyToastContainer />
            <div className="card">
                <img className='rocket-icon single-rocket' src={Rocket} alt="rocket-icon" />
                <h1>Login to Your Account</h1>

                <form onSubmit={loginHandler} >
                    <input className="input-box" type="email" name="email" id="email" placeholder="Enter Email ID" required /><br />
                    <input className="input-box" type="password" name="password" id="password" placeholder="Enter Password" required /><br />
                    <p><NavLink to='/forgot-password'>Forgot Password?</NavLink></p>
                    <button type="submit" className="continue-button">Continue &nbsp; <i className="fa-solid fa-arrow-right"></i></button>
                </form>
                <p>Don't have an account? <NavLink to="/sign-up" >SignUp</NavLink></p>
            </div>
        </main>
    </div>)
}

export default Login;