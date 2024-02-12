import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/home';
import SignUp from './components/sign-up';
import Login from './components/login';
import Authenticate from './components/authenticate';
import AuthSuccess from './components/auth-success';
import UserFeed from './components/feed';
import NewPost from './components/new-post';
import UserCommented from './components/commented-posts';
import UserReplied from './components/replied-posts';
import ViewPost from './components/view-post';
import LoginAuth from './components/login-auth';

function App() {
    return (

      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path="/sign-up" element={<SignUp />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/authenticate" element={<Authenticate />}/>
            <Route path="/auth-success" element={<AuthSuccess />}/>
            <Route path="/feed" element={<UserFeed />}/>
            <Route path="/new-post" element={<NewPost />}/>
            <Route path="/view-post" element={<ViewPost />}/>
            <Route path="/commented-posts" element={<UserCommented />}/>
            <Route path="/replied-posts" element={<UserReplied />}/>
            <Route path="/login-auth" element={<LoginAuth />}/>
          </Routes>
        </BrowserRouter>
      </div>


  );
}

export default App;