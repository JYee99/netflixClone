import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "33bf3fa2fb51923f8ba68f4688bade7b",
    language: "ko-KR",
  },
});

export default instance;
