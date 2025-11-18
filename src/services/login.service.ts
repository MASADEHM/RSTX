import Cookies from "universal-cookie";
import axiosInstance from "../core/interceptor";
import { ILoginResponse, ILoginRequest } from "../interfaces/login.interface";


const url = 'https://www.quickpickdeal.com/api/Auth/GetBearerToken' //'http://restapi.adequateshop.com/api/authaccount/login';
const cookie = new Cookies(null, { sameSite: "lax", path: "/", })
const  cookieName = "_reactstartercookie"

export const Loginservice = {
    login: async (request: ILoginRequest) => {
        console.log(request)
        return await axiosInstance.post<any, ILoginResponse | any>(url, request);
    },
    setToken: async (token: any) => {
        cookie.set(cookieName, token);
    },
    getToken: () => {
        return cookie.get(cookieName)
    },
    removeToken: async () => {
        cookie.remove(cookieName)
    }
}
