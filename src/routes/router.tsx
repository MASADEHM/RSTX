import { RouteObject } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import About from "../pages/about";
import { PrivateRoute } from "./privateroutes";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import CompanySetup from "../pages/company/CompanySetup";
import ContactUs from "../pages/contactus";
import Signup from "../pages/signup";
import QuickCostEstimation from "../pages/cost-estimation/QuickCostEstimation";
import Requests from "@/pages/requests/requests";
import Dashboard from "@/pages/dashboard";
import EmployeeLanding from "@/pages/employee/EmployeeLanding";
import ClientRegistration from "@/pages/employee/ClientRegistration";

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
        path: "/company-setup",
        element: <CompanySetup />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/cal",
        element: <QuickCostEstimation />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
];
const employeeRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <EmployeeLanding />,
      },
      {
        path: "/employee",
        element: <EmployeeLanding />,
      },
      {
        path: "/employee/clients",
        element: <ClientRegistration />,
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
            path: "/requests",
            element: <Requests />,
          },
         
        ],
      },
    ],
  },
];
const TRouter = createBrowserRouter([...publicRoutes, ...privateRoute,...employeeRoutes]);
export default TRouter;
