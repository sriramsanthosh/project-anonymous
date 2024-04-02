import AppIcon from "../images/appIcon.svg";
import Rocket from "../images/rocket.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import LinearIndeterminate from "../../components/loaderMUI";
import { toast } from "react-toastify";
import MyToastContainer from "../../components/toast-container";

const { AUTH } = require('../../apis/user');


function SignUp() {
    const Navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    
    const [loader, setloader] = useState(false);

    const SignUpHandler = async (e) => {
        e.preventDefault();
        setloader(true);
        const newUser = {
            name: name,
            email: email
        }

        await axios.post(AUTH, newUser).then(async (res) => {
            switch (await res.status) {
                case 200:
                    Navigate("/authenticate", { state: { data: res.data } });
                    setTimeout(() => {
                        toast.success("OTP sent to Email");
                    }, 500);
                    break;
                case 201:
                    alert(res.data.message);
                    Navigate("/login", { state: { data: res.data } });
                    break;
                default:
            }
        });
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
            <div className="card">
                <img className='rocket-icon single-rocket' src={Rocket} alt="rocket-icon" />
                <h1>Create Your Account</h1>

                <form onSubmit={SignUpHandler}>
                    <input
                        className="input-box" type="text"
                        id="name" value={name}
                        placeholder="Your Name"
                        onChange={(e) => setName(e.target.value)}
                        required />
                    <br />

                    <input className="input-box" type="email"
                        id="email" value={email}
                        placeholder="Enter Email ID"
                        onChange={(e) => { setEmail(e.target.value) }}
                        required />
                    <br />

                    <button type="submit" className="continue-button">Continue &nbsp; <i className="fa-solid fa-arrow-right"></i></button>
                </form>
                <p>Already have an account? <NavLink to="/login" >Login</NavLink></p>
            </div>
        </main>
    </div>
}

export default SignUp;