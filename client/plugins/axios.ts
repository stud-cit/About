import { AxiosError, AxiosResponse } from 'axios';
const routingRedirection = {
	503: '/',
	500: '/',
	409: '/',
	404: '/',
	401: '/dashboard/auth',
};

export default function({ $axios, redirect }) {
	$axios.onError((error: AxiosError<AxiosResponse> | any) => {
		return redirect(routingRedirection[error.response.status]);
	});
}
