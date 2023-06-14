import $api from ".";

export const fetchProducts = async (filters: any) => {
  const { queryString } = filters;
  const params: any = {};

  if (queryString) {
    params['q'] = queryString;
  }
  if (filters.filters) {
    // params['filters'] = filters.filters;
    params['min'] = filters.filters.price?.min;
    params['max'] = filters.filters.price?.max;
  }

  const response = await $api.get('/products', { params });

  return response.data;
}

export const fetchFavoriteProducts = async () => {
  const response = await $api.get('/favorite-products');

  return response.data;
}
