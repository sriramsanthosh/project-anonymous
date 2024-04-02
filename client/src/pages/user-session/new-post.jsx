import axios from "axios";
import AppIcon from "../images/appIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyToastContainer from "../../components/toast-container";
import LinearIndeterminate from "../../components/loaderMUI";
import { useState } from "react";

const { NEWPOST, RENDERPOST } = require('../../apis/user');

function NewPost() {
    const Navigate = useNavigate();
    const { state } = useLocation();
    let user = state.data;
    console.log(user);
    let postData = state.posts;

    const [loader, setloader] = useState(false);

    async function FeedHandler() {
        setloader(true);
        await axios.post(RENDERPOST, user).then(async (res) => {
            await res.status === 200 ? Navigate("/feed", { state: { data: user, posts: res.data.post } }) : alert("Error rendering Page!!");
        });
        setloader(false);
    }

    async function postHandler(e) {
        e.preventDefault();
        setloader(true);
        let postTiltle = document.querySelector("#post-title").value;
        let postDescription = document.querySelector("#post-description").value;

        const postData = {
            title: postTiltle,
            description: postDescription
        }

        await axios.post(NEWPOST, { user, postData }).then(async (res) => {
            alert(res.data.message)
        });

        await axios.post(RENDERPOST, { user }).then(async (res) => {
            switch (await res.status) {
                case 200:
                    Navigate("/feed", {
                        state: {
                            data: await user,
                            posts: await res.data.post
                        }
                    });
                    break;
                case 201:
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
                <h1 className="nav-right inner-container">Welcome, {user.name}</h1>
            </nav>
        </header>

        <main >

            <div className="feed-container">
                <div className="feed-button-container">
                    <div><button className="feed-button" onClick={FeedHandler}>All Post</button> </div>
                    <div><button className="feed-button" onClick={() => toast.info("Feature will be added soon")}>Commented Post</button> </div>
                    <div><button className="feed-button " onClick={() => toast.info("Feature will be added soon")}>Replied Post</button></div>
                    <div><button className="feed-button create-post-button active" ><i className="fa-solid fa-circle-plus"></i> &nbsp; Create Post</button></div>
                </div>

                <div className="content-container">
                    <h2>Create Post</h2>
                    <form onSubmit={postHandler}>
                        <div className="new-input-div"><input type="text" name="post-title" id="post-title" className="input-box new-post-input " placeholder="Post Title" required /></div>
                        <div className="new-input-div"><textarea className="input-box new-post-input" name="post-description" id="post-description" cols="30" rows="5" placeholder="Describe your post..." required></textarea></div>
                        <div className="new-input-div post-submit-button-container"><button type="submit" className="input-box new-post-input post-submit-button">Post Submit</button></div>
                    </form>
                </div>
            </div>
        </main>
    </div>
}

export default NewPost;