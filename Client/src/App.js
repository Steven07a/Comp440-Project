import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom"

import { useContext } from "react";
import { AuthContext } from "../src/context/authContext";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import "./style.scss"


const Layout = () => {
  // uncomment this code if u want to have user auth on all pages that are not login or register
  // const { currentUser } = useContext(AuthContext);
  // const navigate = useNavigate();
  
  // // does a check to see if the user is logged in
  // if (!currentUser?.username) {
  //   navigate("/login");
  // }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    // all children of this function will have a navbar and footer around them
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post",
        element: <Post />,
      },
      {
        path: "/post/:id",
        element: <SinglePost />,
      },
    ],
  },
  {
    path: "Login",
    element: <Login />,
  },
  {
    path: "Register",
    element: <Register />,
  },
  {
    path: "CreatePost",
    element: <CreatePost />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
