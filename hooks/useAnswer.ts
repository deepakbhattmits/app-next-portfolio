import { useQuery } from "react-query";
import { api } from "../utils";
const useAnswer = (questionId: number) => {
  const fetchAnswer = async ({ queryKey }) => {
    const { data } = await api.get(`/api/v1/${queryKey[1]}`);

    return data;
  };
  const answerInfo = useQuery(["answer", questionId], fetchAnswer, {
    enabled: !!questionId,
  });
  return { answerInfo };
};
export default useAnswer;
