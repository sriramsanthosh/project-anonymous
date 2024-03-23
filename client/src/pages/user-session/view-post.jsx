import AppIcon from "../images/appIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { useEffect, useState } from "react";

import { CREATE_COMMENT, RENDERPOST, RENDER_COMMENTS } from "../../apis/user";
import { toast } from "react-toastify";
import MyToastContainer from "../../components/toast-container";
import LinearIndeterminate from "../../components/loaderMUI";

function ViewPost() {
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log("statecomments", state.comments);
    const [commentsOfPost, setCommentsOfPost] = useState([]);

    let userData = state.data;
    let postsData = state.posts;
    let curr = state.index;
    let currPostID = postsData[curr]._id;

    const [loader, setloader] = useState(false);

    useEffect(() => {
        if (state.comments) {
            setCommentsOfPost(state.comments);
        }
    }, [commentsOfPost])

    async function commentHandler(e) {
        e.preventDefault();
        setloader(true);
        let commentBox = document.querySelector("#comment");
        const commentText = commentBox.value;
        let commentForm = document.querySelector(".comment-form");

        await axios.post(CREATE_COMMENT, { userData, currPostID, commentText }).then(async (res) => {
            alert(res.data.message);
            commentForm.reset();
        });

        await axios.post(RENDERPOST, { userData }).then(async (res) => {
            let postsDatas = res.data.post;
            axios.post(RENDER_COMMENTS, { userData, postsDatas, index: curr }).then(async (res2) => {
                navigate("/view-post", { state: { data: await userData, posts: await postsDatas, index: await curr, comments: await res2.data.commentArray } })
            });
        });

        setloader(false);
    }

    return <div>
        {loader && <LinearIndeterminate />}
        <MyToastContainer />
        <header>
            <nav className="outer-container">
                <div className="nav-left inner-container outer-container">
                    <div className="inner-container logo-container"><img className='app-icon logo' src={AppIcon} alt="app-icon" /></div>
                    <h1 className="inner-container"> ANONYMOUS</h1>
                </div>
                <h1 className="nav-right inner-container">Welcome, {userData.name}</h1>
            </nav>
        </header>

        <main >
            <div className="feed-container">
                <div className="feed-button-container">
                    <div><button className="feed-button" onClick={() => navigate("/feed", { state: { data: userData, posts: postsData } })}>All Post</button> </div>
                    <div><button className="feed-button" onClick={() => toast.info("Feature will be added soon")}>Commented Post</button></div>
                    <div><button className="feed-button" onClick={() => toast.info("Feature will be added soon")}>Replied Post</button></div>
                    <div><button className="feed-button create-post-button"><i className="fa-solid fa-circle-plus"></i> &nbsp; Create Post</button></div>
                </div>

                <div className="content-container">
                    <h2>All Post ({postsData.length})</h2>

                    <div className="post-card">
                        <h2>{postsData[curr].title}</h2>
                        <p>{postsData[curr].content}</p>
                        <i><span className="no_of_comments">{commentsOfPost.length}</span> Comments &nbsp; &nbsp; 0 Reply</i>
                        <h3>Comments</h3>

                        {commentsOfPost && <div className="comments-list">
                            {commentsOfPost.map((commentObj) =>
                                <p>{commentObj.name} : {commentObj.content}</p>
                            )}
                        </div>}
                    </div>

                    <form className="comment-form" onSubmit={commentHandler}>
                        <input className="input-box" type="text" name="" id="comment" placeholder="Type here to add comment..." required /> &nbsp; &nbsp;
                        <input type="hidden" name="post" id={postsData[curr].id} />
                        <button className="continue-button paper-plane" type="submit"  ><i className="fa-solid fa-paper-plane"></i></button>
                    </form>

                </div>

            </div>
        </main>
    </div>
}

export default ViewPost;