import axios from "axios";
export const  local = 'http://localhost:4000'
// const production = '';
const api = axios.create({
    baseURL : `${local}/api`
})

export default api;