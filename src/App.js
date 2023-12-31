import "./App.css";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import { useEffect } from "react";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { BrowserRouter, Route, Routes ,Navigate} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { userLogin } from "./slices/Authslice";
import Chat from "./pages/Chat/Chat";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {

  const Auth=useSelector((state)=>state.Auth);
  const dispatch=useDispatch();
  const user=localStorage.getItem('user-token');
 
  return (
    <BrowserRouter>
      <div className="App">
        <div className="blur" style={{ top: "-18%", right: "0" }}></div>
        <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
        {/* <Home/> */}
      
        <Routes>
        <Route path='/'element={user?<Navigate to='profile'/>:<Navigate to='/login'/>} />
          <Route path="/profile" element={user?<Profile/>:<Navigate to='/login'/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={user?<Navigate to="/profile"/>:<Register/>}/>
          <Route    path="/profile/:id" element={<Profile/>}/>
          <Route    path="/chat" element={user?<Chat/>:<Navigate to="/login"/>} />

        </Routes>

        {/* <Auth/> */}
        <ToastContainer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
