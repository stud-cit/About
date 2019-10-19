const routingRedirection = {
  503: '/',
  500: '/',
  409: '/',
  404: '/',
  401: '/signin',
};

export default function({ $axios, redirect }) {
  $axios.onError(error => {
    const { status } = error.response;
    return redirect(routingRedirection[status]);
  });
}
