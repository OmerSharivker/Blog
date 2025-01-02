import axios from "axios";
export const  local = 'http://localhost:3000'
// const production = '';
const api = axios.create({
    baseURL : `${local}/api`
})

export default api;