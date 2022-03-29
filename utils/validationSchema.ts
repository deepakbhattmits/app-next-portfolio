import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const validationQuestionFormSchema = yup.object().shape({
  que: yup.string().required("Question is required"),
  answer: yup.string().required("Answer is required"),
});
export const formOptions = () => {
  return { resolver: yupResolver(validationQuestionFormSchema) };
};
