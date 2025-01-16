import axios from "axios";
export const  local = 'https://node103.cs.colman.ac.il'
// const production = '';
const api = axios.create({
    baseURL : `${local}/api`
})

export default api;