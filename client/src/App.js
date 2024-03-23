import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/home/home';
import SignUp from './pages/home/sign-up';
import Login from './pages/home/login';
import AuthSuccess from './pages/user-activities/auth-success';
import Authenticate from './pages/user-activities/authenticate';
import UserFeed from './pages/user-session/feed';
import NewPost from './pages/user-session/new-post';
import ViewPost from './pages/user-session/view-post';
import UserCommented from './pages/user-session/commented-posts';
import UserReplied from './pages/user-session/replied-posts';
import LoginAuth from './pages/user-activities/login-auth';
import ForgotPassword from './pages/user-activities/forgot-password';
import SetPassword from './pages/user-activities/set-password';


function App() {
  return (

    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/auth-success" element={<AuthSuccess />} />
          <Route path="/feed" element={<UserFeed />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/view-post" element={<ViewPost />} />
          <Route path="/commented-posts" element={<UserCommented />} />
          <Route path="/replied-posts" element={<UserReplied />} />
          <Route path="/login-auth" element={<LoginAuth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/set-password" element={<SetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>


  );
}

export default App;
