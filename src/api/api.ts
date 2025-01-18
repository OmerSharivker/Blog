import axios from "axios";
export const  local = 'https://node103.cs.colman.ac.il/api'
// const production = '';
const api = axios.create({
    baseURL : `${local}`
})

export default api;
