import { RouteObject } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import About from "../pages/about";
import { PrivateRoute } from "./privateroutes";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import ContactUs from "../pages/contactus";
import Signup from "../pages/signup";


const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
    
      {
        path: "/signup",
        element: <Signup />,
      },
      
   
    ],
  },
];

const privateRoute: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
         
        ],
      },
    ],
  },
];
const TRouter = createBrowserRouter([...publicRoutes, ...privateRoute]);
export default TRouter;
