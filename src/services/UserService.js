import axios from "./customize-axios"

const fetchAllUser = (page) =>{
    return axios.get(`/api/users?page=${page}`);
} 

const postCreaetUser = (name, job) => {
    return axios.post('/api/users', {name,job});
}

const putUpdateUser = (name,job) => {
    return axios.put('/api/users/', {name,job});
}

const deleteUser = (id) => {
    return axios.delete(`/api/user/${id}`);
}

const loginAPI = (email, password) => {
    return axios.post("/api/login",{email, password});
}

export {fetchAllUser, postCreaetUser, putUpdateUser, deleteUser, loginAPI}