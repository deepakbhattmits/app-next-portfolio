import { useMutation, useQueryClient } from "react-query";
import { api } from "../utils/api";
const usePost = () => {
  const queryClient = useQueryClient();
  const post = async (values) => {
    const { data } = await api.post("/api/v1/post-question", { values });
    return data;
  };
  const postMutation = useMutation(post, {
    onMutate: (values) => {},
    onSuccess: (data, values) => {},
    onError: (error: any, values, rollbackValue) => {
      return error;
    },
    onSettled: () => {
      queryClient.invalidateQueries("questions");
    },
  });
  return postMutation;
};
export default usePost;
