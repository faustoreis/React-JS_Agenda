export const errorInterceptor = (error) => {
  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão.'));
  }

  if (error.response?.status === 401) {
    // Do something
  }

  return Promise.reject(error);
};
