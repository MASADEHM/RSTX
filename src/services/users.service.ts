import axiosInstance from "../core/interceptor";
const url = 'https://jsonplaceholder.typicode.com/users'
export const usersService = {
    get: async () => await axiosInstance.get(url)
}