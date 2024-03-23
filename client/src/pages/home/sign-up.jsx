import AppIcon from "../images/appIcon.svg";
import Rocket from "../images/rocket.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const { AUTH } = require('../../apis/user');


function SignUp() {
    const Navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoding, setLoading] = useState();

    const SignUpHandler = async (e) => {
        e.preventDefault();
        var loaderdiv = document.querySelector(".loader");
        function makeVisible() { loaderdiv.style.visibility = "visible"; }
        makeVisible();
        function makeHide() { loaderdiv.style.visibility = "hidden"; }

        const newUser = {
            name: name,
            email: email
        }

        await axios.post(AUTH, newUser).then(async (res) => {
            switch (await res.status) {
                case 200:
                    await makeHide();
                    Navigate("/authenticate", { state: { data: res.data } });
                    break;
                case 201:
                    await makeHide();
                    alert(res.data.message);
                    Navigate("/login", { state: { data: res.data } });
                    break;
                default:
            }
        });
    }

    return <div>
        <div className="loader"></div>
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