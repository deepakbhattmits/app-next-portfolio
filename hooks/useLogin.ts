/** @format */

import  axios  from 'axios';
const useLogin = () => {
	const loginService = (url, data) => {
		return axios.post(url, {
			method: 'POST',
			body: data,
		});
	};

	return { loginService };
};
export default useLogin;
