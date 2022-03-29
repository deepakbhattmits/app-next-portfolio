import axios from "axios";
// export const api = axios.create({
//   baseURL: "http://localhost:3000",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export const api = axios.create({
  baseURL: !!process.env.NODE_ENV?.match(/development/i)
    ? "http://localhost:3000"
    : "https://app-next-portfolio-deepakbhattmits.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});
