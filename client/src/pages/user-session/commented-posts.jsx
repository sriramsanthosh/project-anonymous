import { toast } from "react-toastify";
import MyToastContainer from "../../components/toast-container";
import AppIcon from "../images/appIcon.svg";
import { useNavigate } from "react-router-dom";

function UserCommented() {
    const navigate = useNavigate();
    return <div>
        <MyToastContainer />
        <header>
            <nav className="outer-container">
                <div className="nav-left inner-container outer-container">
                    <div className="inner-container logo-container"><img className='app-icon logo' src={AppIcon} alt="app-icon" /></div>
                    <h1 className="inner-container"> ANONYMOUS</h1>
                </div>
                <h1 className="nav-right inner-container">Welcome, Name</h1>
            </nav>
        </header>

        <main>
            <div className="feed-container">
                <div className="feed-button-container">
                    <div><button className="feed-button" onClick={() => navigate("/feed")}>All Post</button> </div>
                    <div><button className="feed-button active" onClick={() => toast.info("Feature will be added soon")}>Commented Post</button> </div>
                    <div><button className="feed-button" onClick={() => toast.info("Feature will be added soon")}>Replied Post</button></div>
                    <div><button className="feed-button create-post-button" onClick={() => navigate("/new-post")}><i className="fa-solid fa-circle-plus"></i> &nbsp; Create Post</button></div>
                </div>

                <div className="content-container">
                    <h2>Posts Commented (10)</h2>
                    <div className="post-container-outer-div" onClick={() => navigate("/view-post")}>
                        <button className="post-container" >
                            <h2>This is Post Title</h2>
                            <p>12 Comment &nbsp; &nbsp; 10 Reply</p>
                        </button>
                    </div>
                    <div className="post-container-outer-div">
                        <button className="post-container">
                            <h2>This is Post Title</h2>
                            <p>12 Comment &nbsp; &nbsp; 10 Reply</p>
                        </button>
                    </div>
                    <div className="post-container-outer-div">
                        <button className="post-container">
                            <h2>This is Post Title</h2>
                            <p>12 Comment &nbsp; &nbsp; 10 Reply</p>
                        </button>
                    </div>
                </div>

            </div>
        </main>
    </div>
}

export default UserCommented;