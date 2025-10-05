import { useQuery } from "react-query";
import { api } from "../utils";
const useQuestions = () => {
  const fetchQuestions = async () => {
    const { data } = await api.get("/api/v1/get-questions");
    return data;
  };
  const queryInfo = useQuery("questions", fetchQuestions, {
    refetchInterval: 30000,
  });
  return { queryInfo };
};
export default useQuestions;
