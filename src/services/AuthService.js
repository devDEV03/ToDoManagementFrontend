import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/auth';


export const registerAPICall = (registerObj) => axios.post(REST_API_BASE_URL + '/register',registerObj);

export const loginAPICall = (usernameOrEmail,password) => axios.post(REST_API_BASE_URL + '/login', { usernameOrEmail, password});

export const storeToken = (token) => localStorage.setItem("token",token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (username,role) => {
sessionStorage.setItem("authenticatedUser",username);
sessionStorage.setItem("role",role);
}    


export const deleteLoggedInUser = () => {
    sessionStorage.clear();
    localStorage.clear();
}
export const isUserLoggedIn = () => {
    const username = sessionStorage.getItem("authenticatedUser");

    if(username == null){
        return false;
    }
    else{
        return true;
    }
}

export const getLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
}

export const isAdminUser = () => {
    let role = sessionStorage.getItem("role");
    if(role != null && role == 'ROLE_ADMIN'){
        return true;
    }
    else{
        return false;
    }
}