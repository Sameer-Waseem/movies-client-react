import http from "./httpService";
import { apiUrl } from "../config.json";

export function register(user){
    return http.post(`${apiUrl}/register`,{
        name:user.name,
        email:user.email,
        password:user.password
    })
}