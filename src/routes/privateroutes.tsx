import { Navigate, Outlet } from "react-router-dom";
import tokenService from "../services/token.service";

export const PrivateRoute = () => {
    const isLoggedIn = tokenService.LoggedIn();
    console.log(isLoggedIn)

    return (isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />)
}