import axios from "axios";
import AppIcon from "../images/appIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";

const {NEWPOST, RENDERPOST} = require('../apis/user');

function NewPost() {
    const Navigate = useNavigate();
    const { state } = useLocation();
    let user = state.data;
    let postData = state.posts;
    

    function FeedHandler(){
        var loaderdiv = document.querySelector(".loader");
        function makeVisible(){loaderdiv.style.visibility = "visible";}
        makeVisible();
        function makeHide(){loaderdiv.style.visibility = "hidden";}
        axios.post(RENDERPOST, user).then(async (res)=>{
            await makeHide();
            await res.status === 200 ? Navigate("/feed", {state: {data: user, posts:res.data.post}}) : alert("Error rendering Page!!");
        });
    }
    
    function postHandler(e){
        e.preventDefault();
        let postTiltle = document.querySelector("#post-title").value;
        let postDescription = document.querySelector("#post-description").value;

        const postData = {
            title: postTiltle,
            description: postDescription
        }
        
        axios.post(NEWPOST, {user, postData}).then(async (res)=>{
            alert(res.data.message);
        });

        axios.post(RENDERPOST, {user}).then(async (res)=>{
            switch(await res.status){
                case 200:
                    Navigate("/feed", {
                        state: {
                            data: user,
                            posts: res.data.post
                        }
                    });
                    break;
                case 201:
                    break;
                default:
            }
        });
    }

return <div>
    <div className="loader"></div>
    <header>
        <nav className = "outer-container">
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
                    <div><button className="feed-button" onClick={() => Navigate("/commented-posts")}>Commented Post</button> </div>
                    <div><button className="feed-button " onClick={() =>Navigate("/replied-posts")}>Replied Post</button></div>
                    <div><button className="feed-button create-post-button active" ><i class="fa-solid fa-circle-plus"></i> &nbsp; Create Post</button></div>
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