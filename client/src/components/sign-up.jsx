import AppIcon from "../images/appIcon.svg";
import Rocket from "../images/rocket.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const {AUTH} = require('../apis/user');


function SignUp() {
    const Navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const SignUpHandler = (e) => {
        e.preventDefault();
        const newUser = {
            name: name,
            email: email
        }
        axios.post(AUTH, newUser).then(async (res)=>{
            switch(await res.status){
                case 200:
                    Navigate("/authenticate", {state: {data: res.data}});
                    break;
                case 201:
                    alert(res.data.message);
                    Navigate("/login", {state:{data: res.data}});
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
            <h1>Create Your Account</h1>

            <form onSubmit={SignUpHandler}>
                <input 
                    className="input-box" type="text" 
                     id="name" value={name}
                    placeholder="Your Name" 
                    onChange={(e) => setName(e.target.value)} 
                    required/>
                <br />

                <input className="input-box" type="email" 
                     id="email" value={email}
                    placeholder="Enter Email ID" 
                    onChange={(e)=>{setEmail(e.target.value)}}
                    required/>
                <br />

                <button type="submit" className="continue-button">Continue &nbsp; <i className="fa-solid fa-arrow-right"></i></button>
            </form>
        </div>
    </main>
    </div>
}

export default SignUp;