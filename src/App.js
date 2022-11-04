import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import SinglePost from "./pages/SinglePost";
import Write from "./pages/Write";
import MyPosts from "./pages/MyPosts";
import { useSelector } from "react-redux";


function App() {
  const user = useSelector(State=>State.user.currentUser)
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={user?<Home/>:<Login/>}/>
        <Route path="myposts" element={user?<MyPosts/>:<Register/>}/>
        <Route path="login" element={user?<Home/>:<Login/>}/>
        <Route path="register" element={user?<Home/>:<Register/>}/>
        <Route path="/post/:postId" element={<SinglePost/>}/>
        <Route path="write" element={user?<Write/>:<Register/>}/>
        <Route path="/settings/:id" element={user?<Settings/>:<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
