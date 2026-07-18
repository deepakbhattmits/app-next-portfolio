import { useMutation, useQueryClient } from "react-query";
import { api } from "../utils/api";
const useDelete = () => {
  const queryClient = useQueryClient();
  const post = async (id) => {
      const {data}=await api.delete("/api/v1/delete-question",{data: {id} });
    return data;
  };
  const postMutation = useMutation(post, {
    onMutate: (id) => {},
    onSuccess: (data, id) => {},
    onError: (error: any, id, rollbackValue) => {
      return error;
    },
    onSettled: () => {
      queryClient.invalidateQueries("questions");
    },
  });
  return postMutation;
};
export default useDelete;
