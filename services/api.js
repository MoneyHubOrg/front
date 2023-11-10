import axios from "axios";

axios.defaults.headers.common = {
  "Content-Type": "application/json",
}

export const api = axios.create({
  baseURL: "http://localhost:4512"
})