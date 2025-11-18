import Cookies from "universal-cookie"

const cookie = new Cookies();
const cookiename: string = '_reactstartercookie'

const tokenService = {
    setToken: (val: string) => {
        cookie.set(cookiename, val, {
            path: '/'
        })
    },
    getToken: () => {
        return cookie.get(cookiename);
    }
    ,
    LoggedIn: () => {
        return cookie.get(cookiename) ? true : false
    }
    ,
    removeToken: () => {
        cookie.remove(cookiename)
    }
}
export default tokenService;