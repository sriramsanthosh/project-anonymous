import AppIcon from "../images/appIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { RENDER_COMMENTS, RENDERPOST } from "../../apis/user";
import axios from "axios";
import MyToastContainer from "../../components/toast-container";
import { toast } from "react-toastify";




function UserFeed() {
    const { state } = useLocation();
    const Navigate = useNavigate();
    let userData = state.data;
    let postsData = state.posts;

    const ViewPostHandler = async (e, index) => {
        e.preventDefault();
        var loaderdiv = document.querySelector(".loader");

        function makeVisible() {
            loaderdiv.style.visibility = "visible";
        }

        makeVisible();

        function makeHide() {
            loaderdiv.style.visibility = "hidden";
        }


        await axios.post(RENDERPOST, { userData }).then(async (res) => {
            let postsDatas = await res.data.post;
            console.log("postDatas", postsDatas);
            await axios.post(RENDER_COMMENTS, { userData, postsDatas, index }).then(async (res) => {
                console.log("resdata", res.data);
                makeHide();
                await Navigate("/view-post", { state: await { data: await userData, posts: await postsDatas, index: await index, comments: await res.data.commentArray } })
            });
        });
    }




    return <div className="feed">
        <MyToastContainer />
        <div className="loader"></div>
        <header>
            <nav className="outer-container">
                <div className="nav-left inner-container outer-container">
                    <div className="inner-container logo-container"><img className='app-icon logo' src={AppIcon} alt="app-icon" /></div>
                    <h1 className="inner-container"> ANONYMOUS</h1>
                </div>
                <h1 className="nav-right inner-container">Welcome, {userData.name}</h1>
            </nav>
        </header>

        <main>
            <div className="feed-container">
                <div className="feed-button-container">
                    <div><button className="feed-button active">All Post</button> </div>
                    <div><button className="feed-button" onClick={() => toast.info("Feature will be added soon")}>Commented Post</button> </div>
                    <div><button className="feed-button" onClick={() => toast.info("Feature will be added soon")}>Replied Post</button></div>
                    <div><button className="feed-button create-post-button" onClick={() => Navigate("/new-post", { state: { data: userData, posts: postsData } })}><i className="fa-solid fa-circle-plus"></i> &nbsp; Create Post</button></div>
                </div>

                <div className="content-container">
                    <h2>All Post ({postsData.length})</h2>

                    <div className="post-lists loader-box">

                        {postsData.map((postItem, index) =>
                        (
                            <form className={index} onSubmit={(evt) => ViewPostHandler(evt, index)}>
                                <div>
                                    <input type="hidden" name="index" id={index} value={index} />
                                    <button className="post-container-outer-div" id={index}>
                                        <button className="post-container">
                                            <h2>{postItem.title}</h2>
                                            <p>{postItem.comments.length} Comment &nbsp; &nbsp; 0 Reply</p>
                                        </button>
                                    </button>
                                </div>

                            </form>
                        )
                        )}
                    </div>
                </div>

            </div>
        </main>
    </div>
}

export default UserFeed;