import AppIcon from "../images/appIcon.svg";
import SuccessTick from "../images/success-tick.svg";

import { useLocation, useNavigate } from "react-router-dom";

function AuthSuccess() {
    const { state } = useLocation();
    const Navigate = useNavigate();
    let {user} = state.data;
    return <div>
    <header>
        <nav className = "outer-container">
            <div className="nav-left inner-container outer-container">
                <div className="inner-container logo-container"><img className='app-icon logo' src={AppIcon} alt="app-icon" /></div>
                <h1 className="inner-container"> ANONYMOUS</h1>
            </div>
            <h1 className="nav-right inner-container">Welcome, <span className="user-name-on-top">{user.name}</span></h1>
        </nav>
    </header>

    <main>

        <div className="card">
            <img className='success-tick-icon' src={SuccessTick} alt="success-tick-icon" />
            <h1>Account Created Successfully</h1>
            <button  className="continue-button" onClick={() => Navigate("/new-post", {state: {data: user}})}>Create your first post <i class="fa-solid fa-arrow-right"></i></button>
        </div>
    </main>
    </div>
}

export default AuthSuccess;