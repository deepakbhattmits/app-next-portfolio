import axios from "axios";

export const api = axios.create({
  baseURL: !!process.env.NODE_ENV?.match(/development/i)
    ? "http://localhost:3000"
    : "https://app-next-portfolio.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});
